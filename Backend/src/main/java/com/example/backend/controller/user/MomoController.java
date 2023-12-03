package com.example.backend.controller.user;

import com.example.backend.model.DebugInfo;
import com.example.backend.model.MomoDataRequest;
import com.example.backend.model.MomoResponse;
import com.example.backend.model.MomoResponseRequest;
import com.example.backend.utils.Utils;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/api/v1/user/payment/online")
public class MomoController {
    private static final String PATTERN_REGEX = "^[0-9a-zA-Z]([-_.]*[0-9a-zA-Z]+)*$";
    private static final Pattern PATTERN = Pattern.compile(PATTERN_REGEX);
    private static final SecureRandom RANDOM = new SecureRandom();
    private final String endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
    private final String partnerCode = "MOMOBKUN20180529";
    private final String accessKey = "klm05TvNBzhg7h7j";
    private final String secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
    private final String redirectUrl = "http://localhost:3000/cart";
    private final String ipnUrl = "http://localhost:3000/cart";
    private final String requestType = "captureWallet";
    @PostMapping("/create-payment")
    @ResponseBody
    public ResponseEntity<String> createPayment(@RequestBody MomoDataRequest momoRequest) throws Utils.SignatureGenerationException {
        // Extract parameters from the request
        String orderId = generatePartnerTransactionId();
        String orderInfo = "SDK team";
        String amount = momoRequest.getAmount();
        String extraData = "";
        // Generate the unique requestId and current timestamp
        String requestId = String.valueOf(System.currentTimeMillis());
        String currentTime = String.valueOf(System.currentTimeMillis());

// Create a raw hash for the signature
        String rawHash = "accessKey=" + accessKey +
                "&amount=" + amount +
                "&extraData=" + extraData +
                "&ipnUrl=" + ipnUrl +
                "&orderId=" + orderId +
                "&orderInfo=" + orderInfo +
                "&partnerCode=" + partnerCode +
                "&redirectUrl=" + redirectUrl +
                "&requestId=" + requestId +
                "&requestType=" + requestType +
                "&responseTime=" + currentTime;  // Include the responseTime in the rawHash

// Generate the signature using HMAC SHA256
        String signature = Utils.generateHmacSha256Signature(rawHash, secretKey);

        System.out.println(signature);


        // Prepare the request payload
        Map<String, String> requestData = new HashMap<>();
        requestData.put("partnerCode", partnerCode);
        requestData.put("requestId", requestId);
        requestData.put("amount", amount);
        requestData.put("orderId", orderId);
        requestData.put("orderInfo", orderInfo);
        requestData.put("redirectUrl", redirectUrl);
        requestData.put("ipnUrl", ipnUrl);
        requestData.put("lang", "vi");
        requestData.put("extraData", extraData);
        requestData.put("requestType", requestType);
        requestData.put("signature", signature);

        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the HTTP entity with headers and payload
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestData, headers);

        // Make the POST request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(endpoint, requestEntity, String.class);

        // Extract the payUrl from the response and redirect
        String responseBody = responseEntity.getBody();
        // Parse responseBody if needed

        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseBody);
    }




    public static String generatePartnerTransactionId() {
        StringBuilder builder = new StringBuilder();

        // Start with an alphanumeric character
        builder.append(generateRandomAlphanumericChar());

        // Append additional characters according to the regex pattern
        for (int i = 0; i < 10; i++) { // You can adjust the length as needed
            if (RANDOM.nextBoolean()) {
                builder.append(generateRandomAlphanumericChar());
            } else {
                builder.append(generateRandomSymbol());
            }
        }

        return builder.toString();
    }

    private static char generateRandomAlphanumericChar() {
        String alphanumeric = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphanumeric.charAt(RANDOM.nextInt(alphanumeric.length()));
    }

    private static char generateRandomSymbol() {
        char[] symbols = {'-', '_', '.'};
        return symbols[RANDOM.nextInt(symbols.length)];
    }

    public static boolean isValidPartnerTransactionId(String transactionId) {
        Matcher matcher = PATTERN.matcher(transactionId);
        return matcher.matches();
    }



    @PostMapping("/query-payment")
    @ResponseBody
    public ResponseEntity<String> queryPaymentStatus(@RequestBody Map<String, String> requestParams) throws Utils.SignatureGenerationException {
        String orderId = requestParams.get("orderId");
        String requestId = String.valueOf(System.currentTimeMillis());
        String requestType = "queryTransaction";

        String rawHash = "accessKey=" + accessKey +
                "&orderId=" + orderId +
                "&partnerCode=" + partnerCode +
                "&requestId=" + requestId;

        String signature = Utils.generateHmacSha256Signature(rawHash, secretKey);

        Map<String, Object> requestData = new HashMap<>();
        requestData.put("partnerCode", partnerCode);
        requestData.put("requestId", requestId);
        requestData.put("orderId", orderId);
        requestData.put("requestType", requestType);
        requestData.put("signature", signature);
        requestData.put("lang", "vi");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(endpoint, requestEntity, String.class);

        String responseBody = responseEntity.getBody();
        // Parse responseBody if needed

        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseBody);
    }


    @GetMapping("/momo-response")
    public ResponseEntity<String> momoResponse(
            @RequestParam String partnerCode,
            @RequestParam String accessKey,
            @RequestParam String orderId,
            @RequestParam String localMessage,
            @RequestParam String message,
            @RequestParam String transId,
            @RequestParam String orderInfo,
            @RequestParam String amount,
            @RequestParam String errorCode,
            @RequestParam String responseTime,
            @RequestParam String requestId,
            @RequestParam String extraData,
            @RequestParam String payType,
            @RequestParam String orderType,
            @RequestParam String m2signature) throws Utils.SignatureGenerationException {

        // Checksum
        String rawHash = "partnerCode=" + partnerCode +
                "&accessKey=" + accessKey +
                "&requestId=" + requestId +
                "&amount=" + amount +
                "&orderId=" + orderId +
                "&orderInfo=" + orderInfo +
                "&orderType=" + orderType +
                "&transId=" + transId +
                "&message=" + message +
                "&localMessage=" + localMessage +
                "&responseTime=" + responseTime +
                "&errorCode=" + errorCode +
                "&payType=" + payType +
                "&extraData=" + extraData;

        String partnerSignature = Utils.generateHmacSha256Signature(rawHash, secretKey);

        // Compare the signatures
        if (m2signature.equals(partnerSignature)) {
            if ("0".equals(errorCode)) {
                return ResponseEntity.ok("payment succeffuly!");
            } else {
                return ResponseEntity.badRequest().body("payment failed!");
            }
        } else {
            return ResponseEntity.badRequest().body("payment failed!");
        }
    }

    @PostMapping("/momo-response")
    public ResponseEntity<?> momoResponse(@RequestBody MomoResponseRequest request) {
        try {
            String partnerSignature = generateHmacSha256Signature(request);
            if (request.getM2signature().equals(partnerSignature)) {
                if ("0".equals(request.getErrorCode())) {
                    return ResponseEntity.ok(new MomoResponse("Capture Payment Success", true, debugInfo(request, partnerSignature)));
                } else {
                    return ResponseEntity.ok(new MomoResponse(request.getMessage(), false, debugInfo(request, partnerSignature)));
                }
            } else {
                return ResponseEntity.ok(new MomoResponse("ERROR! Fail checksum", false, debugInfo(request, partnerSignature)));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MomoResponse(e.getMessage(), false, null));
        }
    }

    private String generateHmacSha256Signature(MomoResponseRequest request) throws NoSuchAlgorithmException, InvalidKeyException {
        String rawHash = "partnerCode=" + request.getPartnerCode() +
                "&accessKey=" + request.getAccessKey() +
                "&requestId=" + request.getRequestId() +
                "&amount=" + request.getAmount() +
                "&orderId=" + request.getOrderId() +
                "&orderInfo=" + request.getOrderInfo() +
                "&orderType=" + request.getOrderType() +
                "&transId=" + request.getTransId() +
                "&message=" + request.getMessage() +
                "&localMessage=" + request.getLocalMessage() +
                "&responseTime=" + request.getResponseTime() +
                "&errorCode=" + request.getErrorCode() +
                "&payType=" + request.getPayType() +
                "&extraData=" + request.getExtraData();

        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec("at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa".getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);

        byte[] hmacBytes = sha256Hmac.doFinal(rawHash.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hmacBytes);
    }

    private DebugInfo debugInfo(MomoResponseRequest request, String partnerSignature) {
        DebugInfo debugger = new DebugInfo();
        debugger.setRawData(request.toString());
        debugger.setMomoSignature(request.getM2signature());
        debugger.setPartnerSignature(partnerSignature);
        return debugger;
    }

}

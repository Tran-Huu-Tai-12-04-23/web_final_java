package com.example.backend.service;

import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.OrderRequest;
import com.example.backend.dto.UserChangePasswordRequest;
import com.example.backend.model.Address;
import com.example.backend.model.OrderMember;
import com.example.backend.model.VerifyCode;

import java.util.List;

public interface IUserVerityService {

    Boolean verifyCode(Long accountId, String code);
    void removeExpiredVerifyCodesScheduled();

    VerifyCode createVerifyCodeAndSendIt(EmailRequest emailRequest);

    VerifyCode createVerifyForChangePassword(UserChangePasswordRequest userChangePasswordRequest);


}

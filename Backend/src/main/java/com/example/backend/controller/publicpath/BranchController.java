package com.example.backend.controller.publicpath;

import com.example.backend.model.Brand;
import com.example.backend.service.IBranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/branch")
@RequiredArgsConstructor
public class BranchController {
    private final IBranchService iBranchService;

    @GetMapping("")
    public ResponseEntity<List<Brand>> getAllBranch() {
        return ResponseEntity.ok(iBranchService.getAllBranch());
    }

    @PostMapping("/create")
    public ResponseEntity<Brand> createNew(@RequestBody Brand brand) {
        return ResponseEntity.ok(iBranchService.createNew(brand));
    }

    @PutMapping("/edit")
    public ResponseEntity<Brand> edit(@RequestBody Brand brand, @RequestBody Long id) {
        return ResponseEntity.ok(iBranchService.update(brand, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        iBranchService.delete(id);
        return ResponseEntity.ok("Delete branch successfully!");
    }

}

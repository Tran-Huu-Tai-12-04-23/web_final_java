package com.example.backend.controller.publicpath;

import com.example.backend.model.Branch;
import com.example.backend.model.Category;
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
    public ResponseEntity<List<Branch>> getAllBranch() {
        return ResponseEntity.ok(iBranchService.getAllBranch());
    }

    @PostMapping("/create")
    public ResponseEntity<Branch> createNew(@RequestBody Branch branch) {
        return ResponseEntity.ok(iBranchService.createNew(branch));
    }

    @PutMapping("/edit")
    public ResponseEntity<Branch> edit(@RequestBody Branch branch, @RequestBody Long id) {
        return ResponseEntity.ok(iBranchService.update(branch, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        iBranchService.delete(id);
        return ResponseEntity.ok("Delete branch successfully!");
    }

}

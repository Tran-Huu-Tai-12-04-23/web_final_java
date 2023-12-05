package com.example.backend.service;

import com.example.backend.dto.ChangeNewPasswordRequest;
import com.example.backend.dto.MemberRequestUpdate;
import com.example.backend.dto.UserChangePasswordRequest;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import jakarta.mail.MessagingException;

import java.util.List;

public interface IMemberService {
    Member createNew(Member member);
    Member update(Member member, Long id);
<<<<<<< HEAD
=======
    Member updateMember(MemberRequestUpdate memberRequestUpdate, Long id);
>>>>>>> main
    List<Member> getAllAccountNotDelete(Integer page,Integer size);

    Member getMember(Long id);
    Member deleteSoftMember(Long id);
    Member blockMember(Long id);
    Member unLockMember(Long id);
    void deleteMember(Long id);

    Member updateAccumulatePoints(double accumulatePoints,  Long id);
    List<Member> search(String key, Integer page,Integer size);

    Member changePassword(ChangeNewPasswordRequest changeNewPasswordRequest, Long mId) throws MessagingException;

}

package com.example.backend.service;

import com.example.backend.model.Member;

import java.util.List;

public interface IMemberService {
    Member createNew(Member member);
    Member update(Member member, Long id);
    List<Member> getAllAccountNotDelete(Integer page,Integer size);

    Member getMember(Long id);
    Member deleteSoftMember(Long id);
    Member blockMember(Long id);
    void deleteMember(Long id);

    Member updateAccumulatePoints(double accumulatePoints,  Long id);
    List<Member> search(String key, Integer page,Integer size);

}

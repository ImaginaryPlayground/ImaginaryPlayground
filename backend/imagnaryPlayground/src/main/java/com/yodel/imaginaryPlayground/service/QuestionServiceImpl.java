package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.QuestionMapper;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService{

    private final QuestionMapper questionMapper;

    private final int PAGE = 9; //Pagination을 위한 변수
    @Override
    public int saveQuestion(QuestionDto question) throws Exception {
        return questionMapper.saveQuestion(question);
    }

    @Override
    public int editQuestion(QuestionDto question) throws Exception {
        return questionMapper.editQuestion(question);
    }

    @Override
    public int deleteQuestion(int id) throws Exception {
        return questionMapper.deleteQuestion(id);
    }

    @Override
    public QuestionDto lookupQuestion(int id) throws Exception {
        return questionMapper.lookupQuestion(id);
    }

    @Override
    public List<QuestionDto> lookupAllQuestion(int page) throws Exception {
        Map<String, Integer> map = new HashMap<>();
        map.put("page", page);
        map.put("page_last", page+PAGE);
        return questionMapper.lookupAllQuestion(map);
    }

    @Override
    public List<QuestionDto> lookupAllQuestionWithQuestionType(int page, int qna_type) throws Exception {
        Map<String, Integer> map = new HashMap<>();
        map.put("page", page);
        map.put("page_last", page+PAGE);
        map.put("qna_type", qna_type);
        return questionMapper.lookupAllQuestionWithQuestionType(map);
    }

    @Override
    public List<QuestionDto> searchAllQuestion(Map<String, String> map) throws Exception {
        map.put("page_last", Integer.toString(Integer.parseInt(map.get("page")+PAGE)));
        return questionMapper.searchAllQuestion(map);
    }

    @Override
    public List<QuestionDto> searchAllQuestionWithQuestionType(Map<String, String> map) throws Exception {
        map.put("page_last", Integer.toString(Integer.parseInt(map.get("page")+PAGE)));
        return questionMapper.searchAllQuestionWithQuestionType(map);
    }
}

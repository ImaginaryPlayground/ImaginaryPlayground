package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.QuestionMapper;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.vo.DeleteVO;
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
    public int deleteQuestion(DeleteVO deleteVO) throws Exception {
        return questionMapper.deleteQuestion(deleteVO);
    }

    @Override
    public QuestionDto lookupQuestion(int id) throws Exception {
        return questionMapper.lookupQuestion(id);
    }

    @Override
    public List<QuestionDto> lookupAllQuestion(int page) throws Exception {
        PageDto pageDto = new PageDto(0, PAGE, "", "", 0, "");
        return questionMapper.lookupAllQuestion(pageDto);
    }

    @Override
    public List<QuestionDto> lookupAllQuestionWithEmail(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.lookupAllQuestionWithEmail(pageDto);
    }

    @Override
    public List<QuestionDto> searchAllQuestion(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.searchAllQuestion(pageDto);
    }

    @Override
    public List<QuestionDto> searchAllQuestionWithEmail(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.searchAllQuestionWithEmail(pageDto);
    }
}

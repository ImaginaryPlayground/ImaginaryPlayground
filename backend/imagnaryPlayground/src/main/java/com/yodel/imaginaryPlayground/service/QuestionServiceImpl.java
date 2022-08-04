package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.QuestionMapper;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public int deleteQuestion(IdVO idVO) throws Exception {
        return questionMapper.deleteQuestion(idVO);
    }

    @Override
    public QuestionDto lookupQuestion(int id) throws Exception {
        return questionMapper.lookupQuestion(id);
    }

    @Override
    public QuestionDto detailQuestion(QuestionDto questionDto) throws Exception {
        return questionMapper.detailQuestion(questionDto);
    }

    @Override
    public List<QuestionDto> lookupAllQuestion(int page) throws Exception {
        PageDto pageDto = new PageDto(0, PAGE, "", "", 0, "", 0);
        return questionMapper.lookupAllQuestion(pageDto);
    }

    @Override
    public List<QuestionDto> lookAllQuestion() throws Exception {
        return questionMapper.lookAllQuestion();
    }

    @Override
    public int lookupAllQuestionCount(PageDto pageDto) throws Exception {
        return questionMapper.lookupAllQuestionCount(pageDto);
    }

    @Override
    public List<QuestionDto> lookupAllQuestionWithEmail(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.lookupAllQuestionWithEmail(pageDto);
    }

    @Override
    public int lookupAllQuestionWithEmailCount(PageDto pageDto) throws Exception {
        return questionMapper.lookupAllQuestionWithEmailCount(pageDto);
    }

    @Override
    public List<QuestionDto> searchAllQuestion(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.searchAllQuestion(pageDto);
    }

    @Override
    public int searchAllQuestionCount(PageDto pageDto) throws Exception {
        return questionMapper.searchAllQuestionCount(pageDto);
    }

    @Override
    public List<QuestionDto> searchAllQuestionWithEmail(PageDto pageDto) throws Exception {
        pageDto.setPage_last(pageDto.getPage() + PAGE);
        return questionMapper.searchAllQuestionWithEmail(pageDto);
    }

    @Override
    public int searchAllQuestionWithEmailCount(PageDto pageDto) throws Exception {
        return questionMapper.searchAllQuestionWithEmailCount(pageDto);
    }
}

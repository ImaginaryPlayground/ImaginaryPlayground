package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AnswerMapper;
import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService{
    private final AnswerMapper answerMapper;

    @Override
    public Integer isCompleted(int id) throws Exception {
        return answerMapper.isCompleted(id);
    }

    @Override
    public int saveAnswer(AnswerDto answer) throws Exception {
        return answerMapper.saveAnswer(answer);
    }

    @Override
    public int checkCompleted(int question_id) throws Exception {
        return answerMapper.checkCompleted(question_id);
    }

    @Override
    public int editAnswer(AnswerDto answer) throws Exception {
        return answerMapper.editAnswer(answer);
    }

    @Override
    public int deleteAnswer(IdVO idVO) throws Exception {
        return answerMapper.deleteAnswer(idVO);
    }

    @Override
    public AnswerDto detailAnswer(int question_id) throws Exception {
        return answerMapper.detailAnswer(question_id);
    }

    @Override
    public List<AnswerDto> lookupUncompletedAnswer(PageDto pageDto) throws Exception {
        return answerMapper.lookupUncompletedAnswer(pageDto);
    }
}

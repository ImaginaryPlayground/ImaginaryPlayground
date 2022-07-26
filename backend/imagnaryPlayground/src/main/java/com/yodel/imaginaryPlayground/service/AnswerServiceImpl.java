package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AnswerMapper;
import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService{
    private final AnswerMapper answerMapper;

    @Override
    public int isCompleted(int id) throws Exception {
        return answerMapper.isCompleted(id);
    }

    @Override
    public int saveAnswer(AnswerDto answer) throws Exception {
        return answerMapper.saveAnswer(answer);
    }

    @Override
    public int editAnswer(AnswerDto answer) throws Exception {
        return answerMapper.editAnswer(answer);
    }

    @Override
    public int deleteAnswer(int id) throws Exception {
        return answerMapper.deleteAnswer(id);
    }

    @Override
    public AnswerDto detailAnswer(int question_id) throws Exception {
        return answerMapper.detailAnswer(question_id);
    }

    @Override
    public List<AnswerDto> lookupUncompletedAnswer(Map<String, String> map) throws Exception {
        return answerMapper.lookupUncompletedAnswer(map);
    }
}

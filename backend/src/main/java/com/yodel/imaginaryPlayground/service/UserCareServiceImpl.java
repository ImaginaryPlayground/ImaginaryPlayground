package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.UserCareMapper;
import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.BabyVO;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserCareServiceImpl implements UserCareService {

    private final UserCareMapper userCareMapper;

    @Value("${variable.image.view}")
    String imagePath;

    @Value("${variable.image.search.path}")
    String removePath;

    @Override
    public int saveBaby(BabyDto baby) throws Exception {
        return userCareMapper.saveBaby(baby);
    }

    @Override
    public List<BabyDto> searchAllBaby(BabyVO babyVO) throws Exception {
        return convertImagePath(userCareMapper.searchAllBaby(babyVO));
    }

    @Override
    public int searchAllBabyCount(BabyVO babyVO) throws Exception {
        return userCareMapper.searchAllBabyCount(babyVO);
    }

    @Override
    public List<BabyDto> lookupAllBaby(PageDto pageDto) throws Exception {
        return convertImagePath(userCareMapper.lookupAllBaby(pageDto));
    }

    @Override
    public List<BabyDto> searchByKeyword(PageDto pageDto) throws Exception {
        return convertImagePath(userCareMapper.searchByKeyword(pageDto));
    }

    @Override
    public BabyDto lookupBaby(IdVO idVO) throws Exception {
        return userCareMapper.lookupBaby(idVO);
    }

    @Override
    public BabyDto getBaby(BabyDto babyDto) throws Exception {
        BabyDto baby = userCareMapper.getBaby(babyDto);
        String path = baby.getProfile();
        String newPath = imagePath + path.replaceFirst(removePath, "");
        baby.setProfile(newPath);
        return baby;
    }

    @Override
    public int updateBabyInfo(BabyDto baby) throws Exception {
        return userCareMapper.updateBabyInfo(baby);
    }

    @Override
    public int deleteBabyInfo(BabyDto babyDto) throws Exception {
        return userCareMapper.deleteBabyInfo(babyDto);
    }

    @Override
    public List<ConsultDto> getConsultData(IdVO idVO) throws Exception {
        return userCareMapper.getConsultData(idVO);
    }

    //[공통로직] List 내부 아이들의 이미지 주소변환
    private List<BabyDto> convertImagePath(List<BabyDto> babyList){
        if(babyList != null){
            for(int i=0; i<babyList.size(); i++){
                System.out.println(babyList.get(i).getProfile());
                if(babyList.get(i).getProfile() != null) {
                    //리눅스, 윈도우 두 경우를 고려해 모든 경우에서 다음 문자열들 제거
                    String replacedPath = babyList.get(i).getProfile().replaceFirst("/tmp/", "");
                    babyList.get(i).setProfile(imagePath + replacedPath.replaceFirst("C:\\\\image\\\\", ""));
                }
            }
        }
        return babyList;
    }
}

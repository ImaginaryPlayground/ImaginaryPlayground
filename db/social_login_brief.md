# 백엔드 명세서 작성을 위한 작업



## OAuth 플랫폼 프로필 데이터 정리

| NAVER       | KAKAO       | Google              |
| ----------- | ----------- | ------------------- |
| 회원 이름   | 닉네임      | 이름                |
| 이메일      | 이메일      | 이메일              |
| 성별        | 성별        | 성별                |
| 생일        | 생일        | (알 수 없음 - 보류) |
| 연령대      | 연령대      | 연령대              |
| 프로필 사진 | 프로필 사진 | picture             |
| 휴대폰 번호 | X           | ?                   |

​                

## ERD 구조 및 설명

* PK 기본 명칭은 id로 명명한다.
  * FK로 연결할 때는 `대표값_PK`로 명명한다.
* 세부사항
  * user 테이블의 `provider`: 플랫폼명을 나타냄. NAVER, KAKAO, GOOGLE로 분류
  * user 테이블의 `type`: GUEST, USER, ADMIN으로 분류
  * qna_question 테이블의 `secret`: 비밀글 여부
  * qna_question 테이블의 `completed`: 관리자 답글이 달렸다면 true로 변경
  * baby_click 테이블의 `click_pos_x/y`: 아이가 클릭한 데이터를 x, y좌표로 나누어 저장
  * status 테이블의 `status_type`: int형으로 게임 중이면 0, 게임을 종료했으면 1로 저장

​       

## SQL문 조회

* 추후 논의


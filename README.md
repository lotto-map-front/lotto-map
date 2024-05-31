<div align="center">
 <img src="https://github.com/lotto-map/lotto-map-front/blob/main/public/logo.png?raw=true"/>
  <h1>로또 맵</h1>
  로또 사고 싶은데 어디서 살지 고민이신가요?
  <br>
  걱정마세요. 당신이 원하는 로또 판매점 찾아드릴게요.
  <br/><br/>
</div>

## 📎 [로또 맵 바로가기](http://lottomap.net/)

## 💡 프로젝트 소개
**네이버 지도 Api를 이용한 로또 맵**<br>
**누구나 쉽고 빠르게 당첨횟수가 많은 로또 판매점을 찾을수 있고 리스트에서 검색, 즐겨찾기도 가능하며 추첨번호 생성까지 할 수 있습니다.**

## 🎬 프로젝트 진행상황
### ✔︎ 진행기간 : 2024.4.19 ~ 진행 중

## 🛠 사용한 기술 스택
<img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react"> <img src="https://img.shields.io/badge/TypeSript-4.9.5-blue?logo=typescript"><br>
<img src="https://img.shields.io/badge/ReactQuery-3.39.3-blue?logo=react-query"> <img src="https://img.shields.io/badge/Zustand-4.5.2-blue?logo=Zustand"><br>
<img src="https://img.shields.io/badge/StyledComponents-6.1.8-blue?logo=styledcomponents">
<img src="https://img.shields.io/badge/Prettier-blue?logo=prettier"> <img src="https://img.shields.io/badge/Eslint-blue?logo=esLint"> <br>
<img src="https://img.shields.io/badge/ReactHookForm-7.50.1-blue?logo=react-hook-form"> <img src="https://img.shields.io/badge/ReactRouterDom-6.3.0-blue?logo=react-router-dom"><br>

## 🛠 ESLint, Prettier and Husky
<img src = 'https://velog.velcdn.com/images/gogo6570/post/eb902ca1-5ac6-46c1-803d-9f328813424c/image.png'>

`Husky pre-commit hooks`를 통해서 `Airbnb에서 정의한 자바스크립트 규칙`을 `ES-Lint`에 적용하였으며, `Prettier 규칙`도 적용하였습니다. 이를 통해서, `commit을 하게되면`, 정해진 ESLint, Prettier 규칙에 따라 자동으로 검사하게 되며, `통과`하지 `못하면`, `commit이 안되게` 하여 `일관된 코드 컨벤션`을 적용하였습니다.

## 🛠 주요 기능

### ✔︎ 지도
- 메인페이지인 지도에서 현재 위치 기반 당첨횟수가 많은 순서대로 로또 판매점을 확인할 수 있어요
<details markdown="1">
<summary>지도의 마커 클릭시 상세조회</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/fe1bdeba-8b8e-4f09-9e94-125b8952c294/image.gif">
</details>
<br>
<details markdown="1">
<summary>사이드바에서 로또 판매점 즐겨찾기</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/8a691e08-53a7-4a4b-98f4-289f5456f119/image.gif">
</details>

- 즐겨찾기한 판매점들은 나의 로또 판매점에서 리스트 형식으로 볼 수 있어요.

### ✔︎ 리스트
- 리스트 페이지에서 로또 맵의 점수 알고리즘으로 계산한 전국 판매점 랭킹 1등부터 순서대로 볼 수 있어요.<br>
- 판매점 이름과 주소 두 가지로 검색하고 즐겨찾기 할 수 있어요.
<details markdown="1">
<summary>판매점 이름 검색</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/dfdee5b6-5e75-4534-873c-ca96d3bc3f34/image.gif">
</details>
<br>
<details markdown="1">
<summary>판매점 주소 검색</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/72d61d91-4f67-410a-93a2-13a14f518cc2/image.gif">
</details>
<br>
<details markdown="1">
<summary>판매점 상세 페이지</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/4c58c323-7f7f-401f-a1cd-165d55047739/image.gif">
</details>

### ✔︎ 나의 로또 판매점
- 즐겨찾기한 로또 판매점 정보를 리스트 형식으로 확인할 수 있어요.
<details markdown="1">
<summary>나의 로또 판매점</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/6c5ad67e-9a16-4cc0-a300-5c5e09b2c53c/image.gif">
</details>

### ✔︎ 추첨번호
- 번호 뽑기 버튼을 누르면 추첨번호를 랜덤으로 생성할 수 있어요.
<details markdown="1">
<summary>추첨번호 생성</summary>
  <img width="600" src="https://velog.velcdn.com/images/gogo6570/post/38002ae4-563b-40b7-b3cc-2d56169f0884/image.gif">
</details>


## ⚙️ 개발환경 설정 


```bash
npm install

npm start
``` 

  

###  .env 설정
```
REACT_APP_API_URL=
DISABLE_ESLINT_PLUGIN=true
REACT_APP_NAVER_MAP_CLIENT_ID = 
```



## 📁 Directory Structure
```
LottoMap-frontend
├── .husky                          # pre-commit hook
├── public                          # public
└── src
    ├── Apis                        # api 호출 Function
    ├── Assets                      # resoucres
    ├── common                      # theme
    ├── Components                  # 페이지를 구성하는 components           
    ├── Constants                   # api, message, queryStirng, route 및 공통적으로 사용되는 constants       
    ├── context                     # PopUp 제어  
    ├── Hooks                       # Custom Hooks   
    ├── models                      # data type                     
    ├── Pages                       # Pages                            
    ├── Store                       # Zustand를 사용한 전역 Store                         
    ├── Styles                      # Global Style                                                 
    ├── Utils                       # util 함수                       
```


## 🙋🏻‍ FE 팀원
<table >
  <tbody>
      <td align="center">
        <a href="https://github.com/BVBFD">
            <img src="https://avatars.githubusercontent.com/u/83178592?v=4" width="100px;" height="100px;" alt="이성은"/>
<h3><b>이성은</b></h3></a></td>
        <td align="center">
        <a href="https://github.com/bsu0404">
            <img src="https://avatars.githubusercontent.com/u/86921174?v=4" width="100px;" height="100px;" alt="변성은"/>
<h3><b>변성은</b></h3></a></td>
     <td align="center">
        <a href="https://github.com/BbbbTony">
            <img src="https://avatars.githubusercontent.com/u/107832518?v=4" width="100px;" height="100px;" alt="방명규"/>
<h3><b>방명규</b></h3></a></td>
  </tbody>
</table>
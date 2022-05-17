/* eslint-disable react/no-unescaped-entities */
import styled from "@emotion/styled";
import CardForm from "@components/CardForm";

function HomeText() {
  return (
    <HomeTextWrapper>
      <CardForm>
        <h1> 👋 주영게시판에 오신 것을 환영합니다!</h1>
        <h2>기본사항은 다음과 같습니다.</h2>
        <h3>페이지 이동 🔍 </h3>
        <div>
          {" "}
          - 상단의 "Home", "Post", "Write" 로 원하는 페이지로 이동하실 수
          있습니다.
        </div>
        <h3>글쓰기 📝</h3>
        <div>
          {" "}
          - 상단의 "Home", "Post", "Write" 로 원하는 페이지로 이동하실 수
          있습니다.
        </div>
        <h3>글 목록 🗂</h3>
        <div> - 상단의 "Posts"를 눌러 게시글 목록을 불러옵니다.</div>
        <div> - 게시글 제목 옆 "detail"을 눌러 게시글을 자세히 봅니다.</div>
        <h3>글 수정 📝</h3>
        <div>
          {" "}
          - 게시글을 자세히 본 후, "Modify"를 눌러 게시글을 수정 할 수 있습니다.
        </div>
        <h3>글 삭제 🗑</h3>
        <div>
          {" "}
          - 게시글 목록 옆 "delete" 버튼을 클릭하여 게시글을 삭제 할 수
          있습니다.
        </div>
      </CardForm>
    </HomeTextWrapper>
  );
}

const HomeTextWrapper = styled.div``;

export default HomeText;

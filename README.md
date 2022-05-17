# 📌OnBoarding-조주영-FINDA

## 1. 프로젝트 셋팅

**CRA(react-create-app)** 을 통해 프로젝트 셋팅을 간편히 하였습니다.webpack, babel 설정은 직접 따로 하진 않앗으며, 의존성때문에 따로 설정이 필요한 경우,
**CRACO(Create React App Configuration Override)** 을 사용하여 필요한 babel, webpack 셋팅을 Override 하여 `craco.config.js` 에 추가하여 사용하였습니다. 그외 eslint,prettier,typescript,및 절대경로 설정을 위한 Alias설정을 하였습니다.

### craco.config.js

```js
const CracoAlias = require("craco-alias");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.paths.json");

module.exports = {
  babel: {
    presets: [
      "@emotion/babel-preset-css-prop",
      "@babel/preset-env",
      "@babel/preset-typescript",
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  jest: {
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    configure: {
      preset: "ts-jest",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
      }),
    },
  },
};
```


### 프로젝트 실행 방법

해당 Repository에서 clone을 받아가시거나, 다운받으셔서 터미널에서 아래와 같이 입력합니다.
(npm이 설치 되어있어야 합니다!)

#### 패키지 설치

```npm i```

package.json 에 포함된 의존성 패키지들이 일괄적으로 설치합니다.

#### 프로젝트 빌드

```npm run build```

프로젝트를 빌드 합니다.

#### 프로젝트 실행

```npm start```

프로젝트를 실행하여 로컬에서 동작하게 합니다.

#### 테스트 실행

```npm test```

--test-- 에 포함된 TC들이 일괄적으로 실행됩니다.

- vsCode를 이용하시는 경우, extension으로 "jest"를 사용하시는 것을 권장드립니다.

## 2. 주 사용 라이브러리와 사용 의도

### Jest(With "redux-saga-test-plan")

Test Code를 작성하며 TDD방법론(테스트주도방식)에 의거하여 개발을 하기 위해 사용하였습니다.
설정한 규직은 아래와 같습니다.

1. 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
3. 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.

앞서 적은 TDD의 필요성에 대입해서 정리하자면, 요구사항을 테스트 코드로 옮겨 적은 다음에 애플리케이션 코드 작성을 시작하는 것입니다. 이 때 주의할 것은 테스트 코드로 옮길 요구사항들은 쉽게 테스트할 수 있도록 아주 작은 단위부터 차근차근 쌓아나가는 것입니다.

위의 3가지 원칙을 한 사이클(Cycle)로 잡으면서 테스트 코드와 애플리케이션 코드를 번갈아가다보면 긴장감을 유지하면서 상대적으로 더 높은 생산성을 유지할 수 있습니다.

그러나 금번 온보딩에서는, React 및 Redux-saga를 이해하고 익숙하게 사용하기 위해 먼저 구현하고, 다른 컴포넌트 단위로 쪼개 테스트하는 단위테스트가 아닌, 이 saga만을 테스트를 해보는 방식으로 진행했습니다. (+ 추가로 saga를 테스팅하기위한 라이브러리인 ***"redux-saga-test-plan"*** 를 사용하여 Test 하였습니다.) TestCode는 밑에서 자세히 살펴보겠습니다.

### Emotion/styled

styled 컴포넌트를 위해 emotion을 사용하였습니다. 
styled-component는 css in js를 사용하며,자유로운 CSS 커스텀 컴포넌트를 만들어 보다 편리하고 자유롭게 사용 할 수 있습니다.

#### 기존 css in css와의 차이?

#### 기존CSS(SCSS)

- css in css 문법으로 js 파일과는 분리되어 있다.
- 어떤 컴포넌트의 상태값이 변하더라도 반응하기 쉽지 않다.
- 브라우저에 보이지 않은 컴포넌트까지 읽기 때문에 불필요한 컴파일 과정이 추가된다.

#### styled-components

- css in js 방식으로 컴포넌트가 렌더링 될 때만 해당 스타일 정보를 읽는다.
- 동적인 이벤트가 많은 사이트라면 컴포넌트가 자주 렌더링 될 때 그만큼 스타일 정보도 다시 읽어와야 된다.
- 그에 반해 css in css는 이미 html문서에 읽혀져 있는 상태이기 때문에 처음에는 스타일 정보를 가져오는 양이 많더라도 그 후 추가적인 렌더링은 상대적으로 style-components보다 적을 것이다.



### Json-server

json-server를 이용하여 서버를 셋팅하였습니다. 기본구조는 아래와 같고, 

```Post```  ```get``` ```put``` ```delete```  같은 기본 method를 사용가능합니다.

```json
{
  "post": [
  {
   "title": "안녕하세요",
   "body": "저는 조주영 입니다.",
   "id": 4
   },
  ]
}
```





## 3. 프로젝트 폴더 구조와 설계 의도

### ```src/api```

게시글 작성/수정/자세히보기/삭제를 위한 api 스펙이 들어있습니다.

### ```src/__test__```

TestCode를 작성하는 곳 입니다.

### ```src/components```

컴포넌트들을 담아두는 공간입니다.

### ```src/hooks```

필요하다면 사용할 custom hooks 담아두는 공간입니다. 금번과제에서는 useForm customhook을 만들어 validation 설정을 해주었습니다.

### ```src/pages```

페이지들이 있는 공간입니다. 

 ```PostPage``` (리스트) ```DetailPage```(상세보기) ```ModifyPage```(수정) ```WritePage```(글쓰기) ```NotFoundPage```(잘못된 경로)

로 기능별로 나누었습니다.  

### ```src/state```

![image-20220517171109220](/Users/jooyoung/Library/Application Support/typora-user-images/image-20220517171109220.png)



상태관리 사용에 필요한 폴더입니다. 



```post/index.ts```

redux-toolkit으로 초기 상태값, 액션, 리듀서를 하나의 객체에 담아 전달 받는 slice를 정의해둔 곳 입니다.

```rootReducer/index.ts```

reducer들을 combineReducers로 하나로 모아 RootReducer로 정의하는 곳 입니다.

 ```saga/index.ts```

saga들을 정의 해둔 곳입니다.  takeEvery, takeLatest 등을 actions와 같이 사용하여, 해당 action이 일어나면 saga로 제너레이터를 실행하며 비동기작업을 처리해줍니다.

```index.ts```

store를 정의하고, toolkit의 configureStore로 앞서만든 reducer와 saga미들웨어를 연결시켜줍니다.

## 4. 상태 관리의 구조와 설계 의도

react-saga / redux-toolkit을 사용하여 전역적으로 관리하였습니다. 하나씩 살펴 보겠습니다.
![Saga패턴 vs Redux-Saga / 간단한 예제로 살펴보기](https://images.velog.io/images/soop/post/61cbca62-f958-4b18-b4d9-8ac3fb8951f9/IMG_0158.PNG)

### posts

redux-toolkit으로 초기 상태값, 액션, 리듀서를 하나의 객체에 담아 전달 받는 slice를 정의해둔 곳 입니다.
각 reducer 안의 action들은 실행동작과 함께 비동기 통신이 성공했을때 실행 될(state에 업데이트될) actions와 실패했을때를 나누어 saga의 도움을 받고자 설계하였습니다.
ex) 게시글목록을 불러오는 getData action을 부르면, saga에서 api를 이용해 비동기로직을 처리후, 성공했다면 getDataSuccess를 불러 state를 업데이트 시키는 동작을 진행.


```ts

export const postsSlice = createSlice({

  name: "posts",

  initialState: {

​    data: [],

​    loading: true,

​    error: null,

  } as PostsState,

  reducers: {

​    getDataSuccess: (state, action: PayloadAction<Post[]>) => {

​      state.data = action.payload;

​      state.loading = false;

​    },

​    getDataFailure: (state, { payload: error }) => {

​      state.loading = true;

​      state.error = error;

​    },


​    getData: (state, action: PayloadAction<ParamType>) => {

​      state.loading = true;

​    },

​    getDataByIdSuccess: (state, action: PayloadAction<Post>) => {

​      const index = state.data.findIndex(

​        (post) => post.id === action.payload.id,

​      );

​      if (index === -1) {

​        state.data.push(action.payload);

​      } else {

​        state.data[index] = action.payload;

​      }

​      state.loading = false;

​    },


​    getDataById: (state, action: PayloadAction<idParam>) => {

​      state.loading = true;

​    },

​    createPostSuccess: (state, action: PayloadAction<Post>) => {

​      state.data.push(action.payload);

​      state.loading = false;

​    },


​    createPost: (state, action: PayloadAction<PostBody>) => {

​      state.loading = true;

​    },


​    deletePostById: (state, action: PayloadAction<idParam>) => {

​      state.loading = true;

​    },

​    deleteSucess: (state, action: PayloadAction<idParam>) => {

​      state.loading = false;

​      const { id } = action.payload;

​      const index = state.data.findIndex((post) => post.id === id);

​      if (index !== -1) state.data.splice(index, 1);

​    },


​    modifyPost: (state, action: PayloadAction<Post>) => {

​      state.loading = true;

​    },

​    modifyPostSucess: (state, action: PayloadAction<Post>) => {

​      state.loading = false;

​      const { id } = action.payload;

​      const index = state.data.findIndex((post) => post.id === id);

​      if (index !== -1) {

​        state.data[index] = action.payload;

​      }

​    },

  },

  extraReducers: {},

});

```


### saga

saga를 정의한 파일입니다. 각 동작(get,post,delete,put)마다 saga를 정의하여 비동기로직을 제너레이터로(call,put) 한번에 처리해줍니다.

맨밑에 postSaga(main saga)로 takeEvery를 통해 컴포넌트에서 등록한 action이 dispatch가 된다면, 나머지 saga가 일어나 해당 비동기로직을 처리하게끔 해줍니다.
```ts
export function* getDataSaga(action: { payload: ParamType }) {
  const { getDataSuccess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    const response: Post[] = yield call(API.getPostList, param);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getDataSuccess(response));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* getDataByIdSaga(action: { payload: idParam }) {
  const { getDataByIdSuccess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    const response: Post = yield call(API.getPostById, param);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getDataByIdSuccess(response));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getDataFailure(err));
  }
}
export function* createPostSaga(action: { payload: PostBody }) {
  const { createPostSuccess, getDataFailure } = postsAction;
  const body = action.payload;
  try {
    const response: Post = yield call(API.createPost, body);
    yield put(createPostSuccess(response));
    // eslint-disable-next-line no-restricted-globals
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* deletDataSaga(action: { payload: idParam }) {
  const { deleteSucess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    yield call(API.deletePost, param);
    yield put(deleteSucess(param));
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* modifyDataSaga(action: { payload: Post }) {
  const { modifyPostSucess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    yield call(API.modyfyPost, param);
    yield put(modifyPostSucess(param));
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

// Main Saga
export function* postSaga() {
  const { getData, getDataById, deletePostById, createPost, modifyPost } =
    postsAction;
  yield takeEvery(getData, getDataSaga);
  yield takeEvery(getDataById, getDataByIdSaga);
  yield takeEvery(deletePostById, deletDataSaga);
  yield takeEvery(createPost, createPostSaga);
  yield takeEvery(modifyPost, modifyDataSaga);
}
```

그렇게 각 컴포넌트에서 필요한 데이터를 dispatch하여, 적절하게 사용합니다.

ex)게시글 데이터를 받아오는 postPage에서 mounted 되었을때, getData를 dispatch하여 getDataSaga를 함께 일으켜 state를 최신화합니다.

```tsx
  useEffect(() => {
    const { getData } = postsAction;
    dispatch(getData({ post: "post" }));
  }, [dispatch]);
```

## 5.  테스트 시나리오 작성 의도와 목적

앞서 적은 TDD의 필요성에 대입해서 다시한번 정리하자면, 요구사항을 테스트 코드로 옮겨 적은 다음에 애플리케이션 코드 작성을 시작하는 것입니다. 
이러한 규칙을 정해 한 사이클(Cycle)로 잡으면서 테스트 코드와 애플리케이션 코드를 번갈아 가다보면 긴장감을 유지하면서 상대적으로 더 높은 생산성을 유지할 수 있습니다.
그러나 이번에는 미숙한 react와 typescript 개발, 상태관리 툴인 redux-saga를 학습하는데 의의를 두고자, 공식문서를 참고하며 개발을 진행하였고,
보통 redux를 포함하여 단위테스트를 진행할때는 state와 해당 actions들을 mocking 하여 설정한 단위의 라우팅,렌더링, 데이터바인딩을 테스팅하는 것으로 확인했습니다.
그러나 공식문서에서 saga자체를 테스팅하는 방법을 소개하는 챕터가 있길래, 학습을 위하여 읽다가, 간편해보이는 라이브러리 "redux-saga-test-plan" 라이브러리를 이용하여 테스팅하였습니다. 

[공식문서링크](https://redux-saga.js.org/docs/advanced/Testing/).
[참고문서](https://ui.toast.com/weekly-pick/ko_20180514)

이렇듯 개발 프로세스를 reducer && saga 개발 -> Test 에 맞춰 진행하였습니다.

시나리오를 작성할때, input 과 output으로만 test를 하도록 노력하였고(후 코드의 재사용성을 고려하여 짤 수 있도록 컴포넌트 내부의 값은 건드리지 않고, mocking한 결과값으로 testing) 
하나씩 살펴보겠습니다.

### ```Action.test.tsx```
우선 saga들을 테스팅하기전에, toolkit으로 reducer에 정의해두었던 actions 들이 설계한 대로 잘 작성이 되는지에 대한 테스팅을 진행하였습니다. 

모든 테스트 코드를 다룬다면, 길어질 것 같으므로 getDataSuccess 에 대한 테스트코드만 살펴보겠습니다.

- getDataSuccess 액션 생성이 설계한대로 잘 되었는가?

```tsx
  it("getDataSuccess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = [
      { id: 1, title: "test", body: "test" },
      { id: 2, title: "test2", body: "test2" },
    ];
    const expectedAction = {
      payload: [
        { id: 1, title: "test", body: "test" },
        { id: 2, title: "test2", body: "test2" },
      ],
      type: "posts/getDataSuccess",
    };

    expect(postsAction.getDataSuccess(data)).toEqual(expectedAction);
  });
```
모의 데이터를 action의 payload로 넘겨주어(code상의 data) 실제로 잘 생성이 되는지 결과를 expectedAction과 비교하여 확인하였습니다.
getDataSuccess action은 api 비동기 통신결과인 response를 payload로 받아, state에 추가하는 역활을 하므로, 원하는 actions가 잘 생성이 된 것을 테스트로 기대 할 수 있습니다.

나머지 action들도 맞는 payload를 넘겨주어, 기대값과 비교하여 test하였습니다.

### ```Store.test.tsx```
action 들이 잘 생성이 되는 지에 대한 검증이 되었으므로, 실제 이들이 state에 반영이 잘 되는지에 대한 테스팅을 진행해보았습니다.

- getState를 통해 초기 상태값(initial)을 확인

```
  it("설계한대로 state가 나오는가?", () => {
    const state = store.getState();
    const expectedData = {
      postsReducer: {
        data: [],
        loading: true,
        error: null,
      },
    };

    expect(state).toEqual(expectedData);
  });
 ```
- action을 호출하였을 때 state에 잘 반영되는지 확인
```tsx
    it("dispatch시 state의 로딩,데이터등 상태변경이 잘 되는가?", () => {
      const state = store.getState();

      const data = [
        { id: 1, title: "test", body: "test" },
        { id: 2, title: "test2", body: "test2" },
      ];
      const expectedAction = [
        { body: "test", id: 1, title: "test" },
        { body: "test2", id: 2, title: "test2" },
      ];
      store.dispatch(postsAction.getDataSuccess(data));

      expect(store.getState().postsReducer.loading).toEqual(false);
      expect(store.getState().postsReducer.data).toEqual(expectedAction);
    });
```

그러나 위의 TC는, 직접적으로 dispatch를 이용해 state 데이터에 영향을 주는 방식이므로, 단위테스트의 방향과 맞지 않다고 생각하여, 첫 initialState만을 검증하는 것으로 나머지 Test들은 주석처리를 하였습니다. 그렇게 state에 대한 검증을 위해서도, ***redux-saga-test-plan*** 을 사용하여 saga에 대한 검증이 필요하다 생각하였습니다.


- 로그인 컴포넌트가 렌더링이 잘 되었는가?
- 로그인버튼 클릭시 로그인 알림처리가 잘 되는가?(올바른 정보입력/아닌입력)
- mocking한 api repository함수가 호출되는가?
- mocking한 api repository함수로 alert이 동작하는가
- mocking한 router함수로 라우팅이 잘 동작하는가?

### ```UserInfo/userInfo.spec.js```

사용자 정보 페이지는, created훅을 이용하여 create될시, store에 정의된 token을 가지고 데이터를 받아와서 화면에 나타내주는 컴포넌트입니다.
처음에는 setData를 통해 data인스턴스에 값을 줘서, 해당 내용이 잘 렌더링이 되는지에 대한 테스팅을 먼저하고, 실제 컴포넌트에선 요청한데이터를 뿌려주기 때문에, 해당 요청함수가 필요합니다.
따라서 데이터를 받아올 함수를 mocking하여, response값을 실제데이터처럼 줘서 검증을 하였습니다.

login과 마찬가지로, routing 검사는 mocking Router 방식으로 진행하였습니다.

- 유저정보 컴포넌트가 렌더링이 잘 되었는가?
- 유저 정보 관련 태그들이 데이터를 잘 나타내는가?
- 로그아웃버튼 클릭시 알림처리가 잘 되는가?
- mocking한 api repository함수가 호출되는가
- mocking한 api repository함수로 렌더링이 잘이루어지는가
- mocking한 router함수로 로그아웃 라우팅이 잘 동작하는가?

### ```ResetPw/checkEmail.spec.js```

인풋폼에 유저 이메일을 받아, store에 저장하고 이를 바탕으로 요청처리 및 결과처리(다음페이지로 라우팅)를 하는 컴포넌트입니다. 인풋데이터에 대한 검증, 라우팅에 대한 검증이 필요합니다.
plugin으로 import 해온 store를 연결하고, 로그인과 크게 다르지 않게 검증하였습니다.

- 비밀번호 초기화 컴포넌트가 렌더링이 잘 되었는가?
- 다음버튼 클릭시 인증성공 여부와 관계없이 알림처리가 잘 되는가
- mocking한 api repository함수가 호출되는가?
- mocking한 api repository함수로 alert이 동작하는가?
- mocking한 router함수로 라우팅이 잘 동작하는가?

### ```ResetPw/checkAuthCode.spec.js```

인풋폼에 인증번호를 받아 요청처리 및 결과처리를 하는 컴포넌트입니다. 앞서 email과 똑같은 방식으로 TC를 짰습니다.

### ```ResetPw/resetPw.spec.js```

인풋폼 두개로 비밀번호를 검증하는 컴포넌트입니다. 로그인과 같은 방식으로 TC를 짰습니다.

## 6. 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

### ✅ 사소하지만 추가적 기능

- [x] 모든 마크업은 스스로 하였고, scss를 사용하였습니다. 나름의 반응형으로 구현하였습니다.(사용자 정보 페이지)
- [x] SessionStorage를 store와 연계 사용하여, 새로고침시 토큰을 유지하도록 하였습니다. SessionStorage를 사용한 이유는, 개인정보 데이터기 때문에 무한정 저장되는 것이 아닌, 세션이 닫히면 자동으로 삭제되게끔 하는 것이 보안적으로 더 좋다는 나름의 근거를 갖고 사용하였습니다. 
- [x] 요구사항에 input을 사용할 일이 많아 input에 require를 주어, 입력하지 않는 다면 넘어가지 않게 하였습니다.



- [x] maxLength를 사용하여 input값 길이에서 나올 수 있는 오류를 사전에 방지하고, ux적으로 좋게 유도하였습니다.
- [x] router/userInfo.js 안에 navigationGuard를 사용하여 인증되지 않은 사용자가 임의로 url을 임의로 조작하여 내정보 페이지로 이동하는 것을 방지 하였습니다.



# 7.회고



### ✅ 아쉬운점

- [x] 타입스크립트를 사용하지 못하였습니다. 타입스크립트를 사용해본 경험이 없어 3일이내로 셋팅부터 구현까지 도전하기란 무리가 있다고 판단하여, 자신있는 언어인 Js로 일단 작성하여 제출하였습니다.. 제약사항을 못지켜 너무 아쉽고 꼭 공부를 시작해야하는 계기가 된 것 같습니다.
- [x] 지금은 각 컴포넌트내 에서 api요청까지 진행을 하도록 구현하였습니다. 그러나 vuex을 적극적으로 사용하려면 api요청까지 vuex안의 actions로 구현이 되었더라면
  더 좋고 유지보수성이 좋은 vuex활용이 될 수 있었을텐데, repository pattern으로 인터페이스를 만들면서, 해당 api요청 함수를 import해오는 과정중, cycle오류가 생겨(interceptor파일안에 로그인후 store를 import 해서 token을 header에 넣어주는 로직때문에 서로 import하는 상황이 발생) 
  부득이하게 컴포넌트안에서 데이터를 받아왔습니다. 이 점이 너무 아쉽습니다. 인터페이스 설계시, 조금 더 깊이 생각하여 설계하는 것이 중요하다고 생각했습니다. 
- [x] 자주쓰이는 input을 컴포넌트화 해서 재사용성을 높혔다면 더 좋았을 것 같습니다. 당장 구현에 급급하여 설계시간을 충분히 갖지못하고 시간분배를 잘 못한 점 너무 아쉽습니다. 
- [x] 인증번호 검증페이지의 TC를 작성하여 그에맞게 로직을 짜보았으나, jest의 알수없는 오류 쓰지도 않은 'hasOwnProperty'함수가 가 undefined하다는 오류가 나와 결국 TC를 지우고, 개발만 하였습니다. 다른페이지와의 차이점이라면 setInterval을 사용한 페이지인 것 같은데, 앞으로 사용할때마다 대처가 되지 않는다면 치명적일 수 있다 판단하여, 원인을 찾아보고 싶습니다.
- [x] ui를 제대로 못챙긴 것 같습니다. 프론트엔드 개발자라면 그래도 디자인을 신경써야 하는데, 제가 부족한 탓에 디자인을 많이 신경쓰지 못하였습니다.

### 과제를 마치며..

채용프로세스중 과제전형은 처음 겪어보는 진귀한 경험이었습니다. 물론 제가 신입이다 보니 여러기업의 채용프로세스를 겪은 것은 아니지만, 데드라인 내에 개발을 한다는 압박이 되려 진짜 개발자가 된 느낌을 받았고, 저의 여러가지를 코드에 녹아내리면서 PR할수있는 기회이자 동시에 기업에서는 제 문제점들을 한번에 확인 할 수 있는 좋은 프로세스 중 하나라고 느꼈습니다.
과제내용을 보고, 간단하다고 생각하였으나 실제로는 여러가지 난관에 부딪히며 자만 했던 제 마음을 다시금 바로잡을 수 있었습니다. 이를 발판으로 더욱 성장하는 계기로 삼아 멈추지 않겠다는 의지를 다졌습니다.
부족한 저에게 여러가지 깨달음과 이런 소중한 기회를 주시어 감사의 인사를 드리면서, 작성을 마무리 하고자 합니다. 긴 글 읽어주셔서 감사합니다.

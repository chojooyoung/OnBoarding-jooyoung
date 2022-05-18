# 📌OnBoarding-조주영-FINDA

## 목차 
- 1. 프로젝트 셋팅
- 2. 주 사용 라이브러리와 사용 의도
- 3. 프로젝트 폴더 구조와 설계 의도
- 4. 상태 관리의 구조와 설계 의도
- 5. 테스트 시나리오 작성 의도와 목적
- 6. 시연
- 7. 마무리

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
<img width="177" alt="image" src="https://user-images.githubusercontent.com/66211721/168946684-a202685d-61d2-470d-a8ec-8cec18305216.png">

컴포넌트들을 담아두는 공간입니다.

### ```src/hooks```

필요하다면 사용할 custom hooks 담아두는 공간입니다. 금번과제에서는 useForm customhook을 만들어 validation 설정을 해주었습니다.

### ```src/pages```

페이지들이 있는 공간입니다. 

 ```PostPage``` (리스트) ```DetailPage```(상세보기) ```ModifyPage```(수정) ```WritePage```(글쓰기) ```NotFoundPage```(잘못된 경로)

로 기능별로 나누었습니다.  

### ```src/state```

<img width="135" alt="image" src="https://user-images.githubusercontent.com/66211721/168856896-e57e93a4-7f75-42a7-b9bc-24a85feb7f4d.png">


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

[공식문서링크](https://redux-saga.js.org/docs/advanced/Testing/)

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

### ```Saga.test.tsx```

saga의 내용과 함께 TC를 살펴보겠습니다.

```tsx
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

```


```tsx
describe("getPostDataSaga", () => {
  const param = { payload: { post: "post" } };
  const MockPostResponse = [{ id: 1, title: "test", body: "test" }];
  const { getDataSuccess, getDataFailure } = postsAction;

  it("getDataSaga 정상 진행", async () => {
    await expectSaga(Saga.getDataSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.getPostList), MockPostResponse]])
      // put으로 actions 실행
      .put(getDataSuccess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: { data: MockPostResponse, loading: false, error: null },
      })
      .run();
  });

  it("getDataSaga 에러 반환", async () => {
    const error = new Error("모의 에러");

    await expectSaga(Saga.getDataSaga, param)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(Api.getPostList), throwError(error)]])
      .put(getDataFailure(error))
      .hasFinalState({
        postsReducer: { data: [], loading: true, error },
      })
      .run();
  });
});
```

먼저 payload로 전해줄 데이터인 param, api 통신의 mocking response MockPostResponse를 정의합니다.

expectSaga로 saga를 선택해주고, .withReducer로 reducer를 선택합니다.(여기서는 rootReducer)

다음으로, .provide 키워드로 mocking이 필요한 saga안에서 call로 부른 함수(여기선 api 함수)를 response값을 정하여 mocking해줍니다.

.put 키워드로 actions를 실행시켜 state를 업데이트 시킵니다.

.hasFinalState 키워드로 state 를 검증합니다.(해당 테스트를 위한 모의 state)

.run키워드로 테스트를 실행시킵니다.

이렇게 간편하게 saga의 테스팅을 진행 할 수 있어 편리한 라이브러리를 사용하여 TC를 작성하여 검증하였습니다.

## 6. 시연




# 7.회고


### ✅ 아쉬운점

- [x] 타입스크립트를 처음 사용하다보니, 제네릭등 적극활용을 못한 점이 아쉽습니다. 오류를 사전에 방지하는 것은 매우 좋은 기능인 것 같고, 왜 도입하는지 알 것 같습니다. 적극활용 할 수 있도록 해보겠습니다.
- [x] 리액트에 조금 더 익숙해 질 필요를 느꼈습니다. 현재 개발 프로세스가 vue.js에선 이런식으로 했을 것 같다 => 이것을 바탕으로 react로 옮기기로 진행을 하였는데(lifeCycle, 단,양방향 바인딩, 메모이제이션 방법등), 이제는 바로바로 react의 개발방식이 떠오를 수 있게 해야 할 것 같습니다.  
- [x] ui를 제대로 못챙긴 것 같습니다. 프론트엔드 개발자라면 그래도 디자인을 신경써야 하는데, 제가 부족한 탓에 디자인을 많이 신경쓰지 못하였습니다.
- [x] ui를 못챙긴만큼, 게시판기능에 조금 소홀한 것 같습니다. 게시글 리스트에 pagenation or 무한스크롤등 page정보를 서버에 넘겨 순차적으로 데이터를 받아오고, 거기서 디바운싱이나 쓰로틀링을 넣어 최적화 하는 구상을 했었으나, 시간에 비해 리소스를 크게 잡아먹는다는 작업이라 판단했기에 포기하엿습니다. 또한 게시글 수정시, input에 defaultvalue로 기존 값을 넣었기 때문에, validation에서 빈값으로 인식하여 오류메세지를 띄우는 등 자잘한 버그fix를 하지 못하였습니다.
- [x] 컴포넌트, 더 작게는 태그 단위의 TC를 작성하지 못 한 것이 아쉽습니다. 팀이 E2E등 테스트코드를 도입하는 과도기적 단계에 있는 지금, 도움이 되고 빠르게 적응 할 수 있도록 더 디벨롭하여 기여하고 싶습니다.

### 1차 온보딩을 마치며..

첫 회사이기도 하면서, 처음 받아본 온보딩 과제는 처음 겪어보는 진귀한 경험이었습니다. 물론 제가 신입이다 보니 여러기업의 온보딩 프로세스를 겪은 것은 아니지만, 필요한 개발 장비를 셋팅하고, 비지니스 로직에 맞는 기술들을 미리 공부시켜주고, 이를 팀원들에게 발표까지 하는 경험은 되려 진짜 개발자가 된 느낌을 받았고, 저의 여러가지를 코드에 녹아내리면서 공부 할수있는 기회이자 동시에 팀원에게서 제 문제점들을 한번에 확인 할 수 있는 좋은 프로세스 중 하나라고 느꼈습니다.
내용을 보고, 간단하다고 생각하였으나 처음써보는, 익숙하지않은 기술스택으로 실제로는 여러가지 난관에 부딪히며 개발의지를 다시금 바로잡을 수 있었습니다. 이를 발판으로 더욱 성장하는 계기로 삼아 멈추지 않겠다는 의지를 다졌습니다. 2차, 3차도 더 발전 된 모습 보이겠습니다!

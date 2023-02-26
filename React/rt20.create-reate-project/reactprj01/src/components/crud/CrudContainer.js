import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
  useLocation,
  useHistory,
  useNavigate,
} from 'react-router-dom';
import CrudInput from './CrudInput';
import CrudList from './CrudList';

const StyledCrudContainer = styled.div`
  label {
    display: inline-block;
    width: 80px;
  }
  #app > div {
    margin: 5px 0;
  }
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;

function CrudContainer({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [items, setItems] = useState([
    { id: 1, name: '슈퍼맨', power: 100 },
    { id: 2, name: '아쿠아맨', power: 300 },
    { id: 3, name: '스파이더맨', power: 500 },
    { id: 4, name: '배트맨', power: 30 },
  ]); // 상태값이 기본타입인 경우

  // ref 만들기.
  // const refInput = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CrudContainer >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CrudContainer >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CrudContainer >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callbackDel = useCallback(
    (id) => {
      const newList = items.filter((item, idx) => {
        return item.id !== id;
      });
      setItems([...newList]);
    },
    [items],
  );
  const callbackUp = useCallback(
    (id) => {
      const newList = items.map((item, idx) => {
        if (item.id === id) {
          return { ...item, power: item.power + 100 };
        }
        return item;
      });
      setItems([...newList]);
    },
    [items],
  );

  const callbackDown = useCallback(
    (item) => {
      const newList = items.map((obj) => {
        if (obj.id === item.id) {
          obj.power = obj.power - 50;
        }
        return obj;
      });
      setItems(newList);
    },
    [items],
  );

  const callbackSave = useCallback(
    (newitem) => {
      const newItems =
        items &&
        items.length > 0 &&
        items.map((item, idx) => {
          if (item.id === newitem.id) {
            return newitem;
          }
          return item;
        });
      setItems([...newItems]);
    },
    [items],
  );

  const callbackAdd = useCallback(
    (newitem) => {
      let maxid = 0;
      if (items.length > 0) {
        maxid = items
          .map((item) => item.id)
          .reduce((pvalue, cvalue) => (pvalue >= cvalue ? pvalue : cvalue), -1);
      } else {
        maxid = 0;
      }
      const newid = maxid + 1;
      newitem.id = newid;
      setItems([...items, newitem]);
    },
    [items],
  );

  // 이벤트 핸들러 작성.
  const handler = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCrudContainer>
      <div id="app">
        <h1>Creat Read Update Delete</h1>
        <div>
          <CrudInput callbackAdd={callbackAdd}></CrudInput>
        </div>
        <hr />
        <CrudList
          items={items}
          callbackUp={callbackUp}
          callbackDel={callbackDel}
          callbackDown={callbackDown}
          callbackSave={callbackSave}
        ></CrudList>
      </div>
    </StyledCrudContainer>
  );
}

CrudContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(CrudContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정

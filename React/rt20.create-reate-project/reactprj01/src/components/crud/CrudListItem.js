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

const StyledCrudListItem = styled.tr`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;

function CrudListItem({
  item,
  callbackUp,
  callbackDown,
  callbackDel,
  callbackSave,
}) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [isEditMode, setIsEditMode] = useState(false);
  const refInputName = useRef();
  const refInputPower = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CrudListItem >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CrudListItem >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CrudListItem >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // 이벤트 핸들러 작성.
  const handlerDel = (e) => {
    callbackDel(item.id);
  };
  const handlerUp = (e) => {
    callbackUp(item.id);
  };
  const handlerDown = (e) => {
    callbackDown(item);
  };
  const handlerEdit = (e) => {
    setIsEditMode(!isEditMode);
  };
  const handlerSave = (e) => {
    setIsEditMode(!isEditMode);
    const name = refInputName.current.value;
    console.log(name);
    if (!name || !name.trim()) {
      alert('이름을 입력하세요');
      refInputName.current.focus();
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    const power = refInputPower.current.value;
    if (!power || !power.trim()) {
      alert('파워에 숫자를 입력하세요');
      refInputPower.current.focus();
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    if (isNaN(Number(power))) {
      alert('파워에 숫자를 입력하세요');
      refInputPower.current.focus();
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    const newitem = {
      id: item.id,
      name: name,
      power: Number(refInputPower.current.value),
    };

    callbackSave(newitem);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  let strong = '';
  if (item.power >= 300) {
    strong = 'strong';
  }
  const formView = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.power}</td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerEdit}>
          Edit
        </button>
      </td>
    </StyledCrudListItem>
  );
  const formEdit = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          defaultValue={item.name}
          ref={refInputName}
        />
      </td>
      <td>
        <input
          type="number"
          name="power"
          placeholder="숫자를 입력하세요"
          defaultValue={item.power}
          ref={refInputPower}
        />
      </td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerSave}>
          Edit
        </button>
      </td>
    </StyledCrudListItem>
  );

  if (isEditMode) return formEdit;
  else return formView;
}

CrudListItem.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object.isRequired,
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired,
};
CrudListItem.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  itme: {},
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {},
};

export default React.memo(CrudListItem); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정

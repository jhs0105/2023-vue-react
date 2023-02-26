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

const StyledTodoInput = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;

function TodoInput({ callbackAddTodo }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const refInputTodo = useRef();

  // 이벤트 핸들러 작성.
  const handlerShowModal = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    setIsShowModal(!isShowModal);
  };
  const handlerAddTodo = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    e.stopPropagation();

    const value = refInputTodo.current.value;
    if (!value || !value.trim()) {
      setIsShowModal(true);
      return;
    }
    callbackAddTodo(value);
    refInputTodo.current.value = '';
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledTodoInput>
      <div className="inputBox shadow">
        <input
          type="text"
          placeholder="Type what you have to do"
          ref={refInputTodo}
          onKeyUp={(e) => e.keyCode === 13 && handlerAddTodo(e)}
        />
        <span className="addContainer" onClick={handlerAddTodo}>
          <i aria-hidden="true" className="addBtn fas fa-plus"></i>
        </span>
        {isShowModal && (
          <div className="modal-mask">
            <div className="modal-wrapper">
              <div className="modal-container">
                <div className="modal-header">
                  <h3 slot="header">경고</h3>
                </div>

                <div className="modal-footer" onClick={handlerShowModal}>
                  <span>
                    할 일을 입력하세요.
                    <i
                      className="closeModalBtn fas fa-times"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledTodoInput>
  );
}

TodoInput.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
TodoInput.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(TodoInput); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정

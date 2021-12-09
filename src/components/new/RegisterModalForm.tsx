import React, { ReactElement } from 'react';

function RegisterModalForm(): ReactElement {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="category">
            분류
            <select id="category">
              <option value="">분류를 선택해주세요</option>
              <option value="스터디">스터디</option>
              <option value="프로젝트">프로젝트</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="recruitmentNumber">
            모집인원
            <input id="recruitmentNumber" type="number" />
          </label>
        </div>

        <div>
          <label htmlFor="recruitmentEndSetting">
            모집 종료 설정
            <select id="recruitmentEndSetting">
              <option value="1">입력한 시간에 자동으로 종료</option>
              <option value="2">미지정</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="recruitmentEndDate">
            모집 종료일시
            <input id="recruitmentEndDate" type="datetime-local" />
          </label>
        </div>

        <div>
          <label htmlFor="tag">
            태그
            <input id="tag" type="text" />
          </label>
        </div>
      </form>
    </div>
  );
}

export default RegisterModalForm;

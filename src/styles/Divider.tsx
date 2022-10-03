import styled from '@emotion/styled';

const Divider = styled.div`
  width: 1px;
  min-width: 1px;
  height: 10px;
  background: ${({ theme }) => theme.accent3};
  margin: 0px 8px;
  border-radius: 1px;
`;

export default Divider;

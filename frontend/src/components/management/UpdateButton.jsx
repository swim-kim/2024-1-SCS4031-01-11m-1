import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import updateicon from '../image/updateicon.png';

const Container = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    gap: 7px;
    border: none;
    background: none;
    cursor: pointer;
`;

const UpdateIcon = styled.img`
    width: 17px;
    height: 17px;
`;

const Text = styled.div`
    color: #727272;
    font-family: Pretendard, sans-serif;
    font-size: 14px;
    font-weight: 500;
`;

function UpdateButton({ productId, onClick }) {
  return (
    <Container onClick={onClick}>
        <UpdateIcon src={updateicon} alt="Update Icon" />
        <Text>Update Voc</Text>
        {productId}
    </Container>
  );
}

UpdateButton.propTypes = {
  productId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

UpdateButton.defaultProps = {
  productId: '',
};

export default UpdateButton;

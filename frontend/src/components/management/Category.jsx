import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import morebutton_icon from '../image/morebutton_icon.png';

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
    color: #333;
    text-align: left;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px;
    position: relative; /* Added for positioning options container */
`;

const MoreButton = styled.button`
    position: relative;
    width: 20px;
    height: 20px;
    background: url(${morebutton_icon}) no-repeat center;
    background-size: contain;
    border: none;
    cursor: pointer;
`;

const OptionsContainer = styled.div`
    position: absolute;
    top: ${({ position }) => position.y}px;
    left: ${({ position }) => position.x}px;
    z-index: 99;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const OptionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 5px;
    text-align: left;
    color: #000;
    font-family: "Wanted Sans";
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Category = ({ categoryName, categoryId, onDelete }) => {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setContextMenuVisible(true);
    };

    const handleDelete = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const accessToken = userInfo ? userInfo.accessToken : null;
            const memberId = userInfo ? userInfo.memberId : null;

            if (!accessToken || !memberId) {
                console.error('Access token or member ID not found');
                return;
            }

            await axios.delete(`http://15.165.14.203/api/member-data/delete-category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            onDelete(categoryId);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
        setContextMenuVisible(false);
    };

    return (
        <TableRow onContextMenu={handleContextMenu}>
            <TableCell>
                {categoryName}
                <OptionsContainer visible={contextMenuVisible} position={contextMenuPosition}>
                    <OptionButton onClick={handleDelete}>Delete</OptionButton>
                </OptionsContainer>
            </TableCell>
        </TableRow>
    );
};

Category.propTypes = {
    categoryName: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Category;

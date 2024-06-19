import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from "./Navbar";
import Tab from "../components/management/Tab";
import ProductTable from "../components/management/ProductTable";
import MeetingMinutesTable from "../components/management/MeetingMinutesTable";
import CategoryTable from "../components/management/CategoryTable";
import plusicon from '../components/image/plus_icon.png';
import AddProduct from '../components/management/AddProduct.jsx';
import AddCategory from '../components/management/AddCategory.jsx';
import AddMinute from '../components/management/AddMinute.jsx';
import UpdateButton from '../components/management/UpdateButton.jsx';
import ProductDropdown from '../components/management/ProductDropdown.jsx';

const Container = styled.div`
    width: 100%;
    height: 83vh;
    background-color: #F5F7FA;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    align-items: center; 
`;

const Title = styled.p`
    color: #333;
    font-family: "Wanted Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 27px;
    margin-left: 40px;
`;

const ListContainer = styled.div`
    width: 1430px;
    height: 800px; 
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #DFDFDF;
    background: #FFF;
    position: relative;
`;

const AddProductbtn = styled.button`
    display: flex;
    width: 116px;
    height: 31px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #1C3159;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25);
    color: #DFDFDF;
    text-align: center;
    font-family: "Wanted Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position:relative;
    left:88%;
    top:15px;
`;

const AddMinutebtn = styled.button`
    display: flex;
    width: 116px;
    height: 31px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #1C3159;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25);
    color: #DFDFDF;
    text-align: center;
    font-family: "Wanted Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position:relative;
    left:88%;
    top:10px;
`;

const Addicon = styled.div`
    background: url(${plusicon});
    background-repeat: no-repeat;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
`;

const UpdateContainer = styled.div`
    display: flex;
    width: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    position: absolute;
    right: 5%;
    top: 10%;
`;

function Management() {
    const [activeTab, setActiveTab] = useState('Product');
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showAddMinuteModal, setShowAddMinuteModal] = useState(false);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleAddProductClick = () => {
        setShowAddProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowAddProductModal(false);
    };

    const handleAddMinuteClick = () => {
        setShowAddMinuteModal(true);
    }
    
    const handleCloseMinuteModal = () => {
        setShowAddMinuteModal(false);
    }

    const handleAddCategoryClick = () => {
        setShowAddCategoryModal(true);
    }
    const handleCloseCategoryModal = () => {
        setShowAddCategoryModal(false);
    }

    const handleSelect = (productId) => {
        setSelectedProductId(productId);
    };
    
    const handleUpdate = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { accessToken, memberId } = userInfo;
        if (!selectedProductId) {
            alert('상품을 선택하세요.');
            return;
        }

        setLoading(true);

        const maxRetries = 3;
        let attempt = 0;
        let success = false;

        while (attempt < maxRetries && !success) {
            attempt++;
            try {
                const response = await fetch(`http://15.165.14.203/api/voc/updateVocByProductId/${selectedProductId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ productId: selectedProductId }),
                });
                console.log(selectedProductId);

                if (!response.ok) {
                    if (response.status === 504) {
                        throw new Error('Gateway Timeout');
                    }
                    throw new Error('Failed to update product');
                }

                const data = await response.json();
                console.log(`Product with ID ${selectedProductId} updated successfully`, data);
                alert(`Product with ID ${selectedProductId} updated successfully`);
                success = true;
            } catch (error) {
                if (error.message === 'Gateway Timeout') {
                    console.error(`Attempt ${attempt} failed: ${error.message}`);
                    if (attempt === maxRetries) {
                        alert('The server is taking too long to respond. Please try again later.');
                    }
                } else {
                    console.error('Error updating product:', error);
                    alert('Error updating product');
                    break;
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Navbar />
            <Title>Management</Title>
            <UpdateContainer>
                <UpdateButton productId={selectedProductId} onClick={handleUpdate} />
                <ProductDropdown onSelect={handleSelect} />
            </UpdateContainer>
            <Container>
                <ListContainer>
                    <Tab onTabChange={handleTabChange} />
                    {activeTab === 'Product' && (
                        <>
                            <AddProductbtn onClick={handleAddProductClick}>
                                <Addicon />
                                Add Product
                            </AddProductbtn>
                            <ProductTable />
                        </>
                    )}
                    {activeTab === 'Meeting Minutes' && (
                        <>
                            <AddMinutebtn onClick={handleAddMinuteClick}>
                                <Addicon />
                                Add minute
                            </AddMinutebtn>
                            <MeetingMinutesTable />
                        </>
                    )}
                    {activeTab === 'Category' && (
                        <>
                            <AddMinutebtn onClick={handleAddCategoryClick}>
                                <Addicon />
                                Add category
                            </AddMinutebtn>
                            <CategoryTable />
                        </>
                    )}
                </ListContainer>
            </Container>
            {showAddProductModal && <AddProduct onClose={handleCloseProductModal} />}
            {showAddMinuteModal && <AddMinute onClose={handleCloseMinuteModal} />}
            {showAddCategoryModal && <AddCategory onClose={handleCloseCategoryModal} />}
            {loading && <div>Loading...</div>}
        </>
    );
}

export default Management;

import React from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import ImageUploadPopup from 'components/popup/image-upload-popup';
import '../styles/header.css';

interface PageKindProps {
    pageKind: string | undefined;
}

const Header = ({ pageKind }: PageKindProps) => {
    const [isImageUploadPopupOpen, setIsImageUploadPopupOpen] = useState(false);

    return (
        <>
            <header>
                <h1>
                    <button onClick={() => (window.location.href = `/${pageKind}`)}>
                        <span>안전</span>내비게이션
                    </button>
                </h1>
                {pageKind === 'official' && (
                    <button className="btn-report" onClick={() => setIsImageUploadPopupOpen(true)}>
                        <span className="blind">상황신고 팝업열기</span>
                    </button>
                )}
            </header>

            {/* 상황신고 팝업 */}
            <ImageUploadPopup isOpen={isImageUploadPopupOpen} onClose={() => setIsImageUploadPopupOpen(false)} />
        </>
    );
};

export default Header;

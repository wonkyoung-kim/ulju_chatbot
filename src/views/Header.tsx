import React from 'react';
import { useState } from 'react';

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
                    <span>안전</span>내비게이션
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

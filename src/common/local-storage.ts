'use client';

// 검색어 배열 가져오기
function getSearchTextList(): string[] {
    const searchText = window.localStorage.getItem('PREVIOUS_SEARCH_TEXT');
    if (!searchText) return [];

    try {
        const parsed = JSON.parse(searchText);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error('Failed to parse search text from localStorage', e);
        return [];
    }
}

// 검색어 배열 저장하기
function setSearchTextList(searchList: string[]) {
    window.localStorage.setItem('PREVIOUS_SEARCH_TEXT', JSON.stringify(searchList));
}

// 새로운 검색어 추가하기 (중복 제거 + 최근 3개만 유지)
function addSearchText(newText: string) {
    if (!newText.trim()) return; // 빈 문자열은 저장하지 않음
    // const currentList = getSearchTextList().filter(text => text !== newText);
    const currentList = getSearchTextList();
    if (currentList.length > 2) {
        currentList.shift(); // 최근 3개만 유지(처음 검색어 제거)
    }
    const updatedList = [...currentList, newText].slice(0, 3);
    setSearchTextList(updatedList);
}

// SessionId 저장하기
function setUljusafeSessionId(id: string) {
    window.localStorage.setItem('ULJUSAFE_SESSION_ID', id);
}

// 세션ID 가져오기
function getUljusafeSessionId() {
    const uljusafeSessionId = window.localStorage.getItem('ULJUSAFE_SESSION_ID');
    return uljusafeSessionId;
}

// 큰큰폰트 여부 가져오기
function setBigFontTF(tf: boolean) {
    const tfStr = tf ? 'true' : 'false';
    window.localStorage.setItem('PREVIOUS_SEARCH_TEXT', tfStr);
}

// 큰큰폰트 여부 가져오기
function getBigFontTF() {
    const bigFontTF = window.localStorage.getItem('PREVIOUS_SEARCH_TEXT');
    if (bigFontTF === 'true') {
        return true;
    } else {
        return false;
    }
}

export { getSearchTextList, addSearchText, getUljusafeSessionId, setUljusafeSessionId, setBigFontTF, getBigFontTF };

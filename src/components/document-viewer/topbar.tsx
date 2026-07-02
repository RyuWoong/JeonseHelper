import { Menu, Search, ShieldCheck } from "lucide-react";

type TopbarProps = {
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
};

export function Topbar({
  onOpenSidebar,
  onOpenSearch
}: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label="문서 메뉴 열기"
        onClick={onOpenSidebar}
      >
        <Menu size={20} />
      </button>
      <a className="brand" href="#top" aria-label="전세 도우미 홈">
        <ShieldCheck size={22} />
        <span>전세 도우미</span>
      </a>
      <button
        className="search-box"
        type="button"
        aria-label="문서 검색 열기"
        onClick={onOpenSearch}
      >
        <Search size={17} />
        <span>보증보험, 임차권등기, 경찰...</span>
      </button>
    </header>
  );
}

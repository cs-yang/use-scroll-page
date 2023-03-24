import { Ref } from 'react';
interface IScrollPage {
    /**
     * ref回调函数
     */
    refCallback: Ref<any>;
    /**
     * dom上滚动方法
     */
    onScroll: (e: Event) => void;
    /**
     * 上一步
     */
    onPrev: () => void;
    /**
     * 下一步
     */
    onNext: () => void;
    /**
     * 前一步是否可用
     */
    prev: boolean;
    /**
     * 后一步是否可用
     */
    next: boolean;
    /**
     * 滚动区小于滚动宽度不显示
     */
    visible: boolean;
}
declare const useScrollPage: () => IScrollPage;
export default useScrollPage;

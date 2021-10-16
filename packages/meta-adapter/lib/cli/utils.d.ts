export declare const keypress: () => Promise<void>;
export declare const sleep: (ms: number) => Promise<void>;
interface PlaySubtitleOption {
    blocker?: (() => Promise<void>) | null;
    interval?: number;
    hint?: string;
}
export declare const playSubtitle: (textList: string[], option?: PlaySubtitleOption | undefined) => Promise<void>;
export {};

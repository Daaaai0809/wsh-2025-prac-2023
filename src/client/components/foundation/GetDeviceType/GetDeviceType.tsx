import type { ReactNode } from 'react';
import { Component } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export class GetDeviceType extends Component<Props> {
  private _windowWidth: number;
  private _debounceTimeout: number | null = null;

  constructor(props: Props) {
    super(props);
    this._windowWidth = window.innerWidth;
  }

  componentDidMount(): void {
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this._handleResize);
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
  }

  private _handleResize = () => {
    // すでにタイマーがあればクリア
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    // 200ms後に処理を実行
    this._debounceTimeout = window.setTimeout(() => {
      const newWidth = window.innerWidth;
      if (newWidth !== this._windowWidth) {
        this._windowWidth = newWidth;
        this.forceUpdate();
      }
    }, 200);
  };

  render() {
    const { children: render } = this.props;
    return render({
      deviceType: this._windowWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE,
    });
  }
}

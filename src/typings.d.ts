/* SystemJS module definition */
declare var nodeModule: NodeModule;

interface NodeModule {
  id: string;
}

declare var window: Window;

interface Window {
  aria2: any;
  process: any;
  require: any;
}

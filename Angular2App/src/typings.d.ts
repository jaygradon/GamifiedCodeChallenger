/* SystemJS module definition */
declare var module: NodeModule;
declare var window: Window;

interface Window { my: any; }

interface NodeModule {
  id: string;
}

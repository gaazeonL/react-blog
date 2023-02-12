import {
  IToolbarConfig,
  IDomEditor,
  SlateDescendant,
  IEditorConfig,
} from "@wangeditor/editor";

interface ToolbarProps {
  editor: IDomEditor | null;
  defaultConfig?: Partial<IToolbarConfig>;
  mode?: string;
  style?: object;
  className?: string;
}
interface EditorProps {
  defaultContent?: SlateDescendant[];
  onCreated?: (editor: IDomEditor) => void;
  defaultHtml?: string;
  value?: string;
  onChange: (editor: IDomEditor) => void;
  defaultConfig: Partial<IEditorConfig>;
  mode?: string;
  style?: React.CSSProperties;
  className?: string;
}
export type getToolbarPropsType = (editor: IDomEditor | null) => ToolbarProps;
export type getEditorPropsType = (
  editor: IDomEditor | null,
  setEditor: React.Dispatch<React.SetStateAction<IDomEditor | null>>,
  html: string,
  setHtml: React.Dispatch<React.SetStateAction<string>>,
  uuid: string
) => Partial<EditorProps>;

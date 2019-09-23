'use babel';

import ZhrtImgPasteView from './zhrt-img-paste-view';
import { CompositeDisposable } from 'atom';

export default {

  zhrtImgPasteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.zhrtImgPasteView = new ZhrtImgPasteView(state.zhrtImgPasteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.zhrtImgPasteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zhrt-img-paste:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.zhrtImgPasteView.destroy();
  },

  serialize() {
    return {
      zhrtImgPasteViewState: this.zhrtImgPasteView.serialize()
    };
  },

  toggle() {
    console.log('ZhrtImgPaste was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

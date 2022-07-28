'use babel';

import Slot4dTerbaruView from './slot-4d-terbaru-view';
import { CompositeDisposable } from 'atom';

export default {

  slot4dTerbaruView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slot4dTerbaruView = new Slot4dTerbaruView(state.slot4dTerbaruViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slot4dTerbaruView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-4d-terbaru:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slot4dTerbaruView.destroy();
  },

  serialize() {
    return {
      slot4dTerbaruViewState: this.slot4dTerbaruView.serialize()
    };
  },

  toggle() {
    console.log('Slot4dTerbaru was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

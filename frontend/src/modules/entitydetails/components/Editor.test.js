import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Editor from './Editor';


const TRANSLATION = 'test';
const SELECTED_ENTITY = {
    pk: 42,
    original: 'le test',
    translation: [{string: TRANSLATION}],
};


function createShallowEditor(suggestMock = null) {
    return shallow(<Editor
        activeTranslation={ TRANSLATION }
        selectedEntity={ SELECTED_ENTITY }
        sendSuggestion={ suggestMock }
    />);
}


describe('<Editor>', () => {
    it('renders correctly', () => {
        const wrapper = createShallowEditor();

        expect(wrapper.find('button')).toHaveLength(3);
        expect(wrapper.find('textarea').html()).toContain(TRANSLATION);
    });

    it('updates the textarea when the state changes', () => {
        const wrapper = createShallowEditor();

        expect(wrapper.find('textarea').html()).not.toContain('something else');
        wrapper.setState({translation: 'something else'});
        expect(wrapper.find('textarea').html()).toContain('something else');
    });

    it('clears the text when the Clear button is clicked', () => {
        const wrapper = createShallowEditor();

        expect(wrapper.state('translation')).toEqual(TRANSLATION);
        wrapper.find('.action-clear').simulate('click');
        expect(wrapper.state('translation')).toEqual('');
    });

    it('copies the original string in the textarea when the Copy button is clicked', () => {
        const wrapper = createShallowEditor();

        expect(wrapper.state('translation')).toEqual(TRANSLATION);
        wrapper.find('.action-copy').simulate('click');
        expect(wrapper.state('translation')).toEqual(SELECTED_ENTITY.original);
    });

    it('calls the suggest action when the Suggest button is clicked', () => {
        const suggestMock = sinon.spy();
        const wrapper = createShallowEditor(suggestMock);

        wrapper.find('.action-send').simulate('click');
        expect(suggestMock.calledOnce).toBeTrue;
    });
});

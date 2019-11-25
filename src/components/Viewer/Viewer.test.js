import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import should from 'should';
import React from "react";

import Viewer from "./Viewer";
import {eventsWithInstanceAndSource, streamHost} from "../../test/fixtures";

Enzyme.configure({adapter: new Adapter()});

describe('<Viewer>', () => {
    it ("shows an info message when events are not present", () => {
        const viewer = shallow(<Viewer/>);
        viewer.find('span').text().should.equal('No events provided');
    })

    it ("creates a carousel item for each event", () => {
        const events = eventsWithInstanceAndSource();
        const viewer = shallow(<Viewer events={events} streamHost={streamHost}/>);
        viewer.find('img').should.have.length(2);
    })
})
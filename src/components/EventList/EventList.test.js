import React from 'react'
// https://stackoverflow.com/a/51571404/315385
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import should from 'should'

import EventList from './EventList'

Enzyme.configure({adapter: new Adapter()});

describe ("creating <EventList/>", () => {
    it("should render info msg when there are no events", () => {
        const list = shallow(<EventList />);
        list.find('div.span').should.equal(1)
        list.text().should.equal("No events available")
    })
})
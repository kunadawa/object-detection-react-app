import React from 'react'
// https://stackoverflow.com/a/51571404/315385
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import should from 'should'

import {STREAM_HOST} from '../../api/stream-api'
import EventList from './EventList'

Enzyme.configure({adapter: new Adapter()});

describe ("<EventList/>", () => {
    it("should render info msg when there are no events", () => {
        const list = shallow(<EventList />);
        list.find('span').should.have.length(1)
        list.find('span').text().should.equal("No events available")
    });

    const framePath = '/relative/path';
    const framePath2 = '/relative/path2';

    const event1 = {
        detectionBoxes:{
            numbers:[ 0.3106740713119507, 0.09698716551065445, 0.8693511486053467, 0.29769110679626465]
        },
        stringMap:{frame_path: framePath},
        "detectionScores": [0.9220165014266968],
        "categoryIndex": {"1": "person"},
        "detectionClasses": [1],
    };

    const event2 = {
        detectionBoxes:{
            numbers:[0.30294761061668396, 0.05614370107650757, 0.8669027090072632, 0.28341057896614075, 0.2969774305820465, 0.3013843894004822, 0.8314237594604492, 0.4671176075935364]
        },
        stringMap:{frame_path: framePath2},
        "detectionScores": [0.9401428699493408, 0.937097430229187],
        "categoryIndex": {"1": "person"},
        "detectionClasses": [1, 1],
    };

    it("should render the last image on the event list when event list is supplied", () => {
        // both events belong to same instance, source
        const instanceName = 'localhost';
        const source = "video1";
        const events = [event1, event2].map(event => ({...event, instanceName, source}))
        const list = shallow(<EventList events={events}/>);
        list.exists(`div img[src='${STREAM_HOST}${framePath2}']`).should.be.true()
        list.find('div > h3').text().should.equal(`${instanceName} - ${source}`)
    })

    it("should show the number of unseen messages", () => {
        const event01 = {seen:false, stringMap:{frame_path: 'framePath01'}};
        // mark these events as seen
        const seen = true;
        const events = [event1, event2].map(event => ({...event, seen}))
        const list = shallow(<EventList events={[...events, event01]}/>);
        list.find('div > span').text().should.equal('1')
    })
})
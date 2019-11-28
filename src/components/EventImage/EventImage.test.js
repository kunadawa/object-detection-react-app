import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import should from 'should';
import React from "react";
import {shallow} from "enzyme";

import EventImage from "./EventImage";
import {events as sampleEvents} from '../../test/sample-events'
import {STREAM_HOST} from "../../api/stream-api";

Enzyme.configure({adapter: new Adapter()});


describe('<EventImage/>', () => {
    it('renders an outer div', () => {
        const eventImage = shallow(<EventImage event={sampleEvents[0]}/>);
        expect(eventImage).not.toBeUndefined();
        eventImage.is('div').should.be.true();
    });

    it('renders an image with the frame dimensions, src', () => {
        const img = shallow(<EventImage event={sampleEvents[0]}/>).find('div > img');
        const height = img.prop('height');
        expect(height).not.toBeUndefined();
        const width = img.prop('width');
        expect(width).not.toBeUndefined();
        height.should.equal(400);
        width.should.equal(400);
        const src = img.prop('src');
        expect(src).not.toBeUndefined();
        src.should.equal(`${STREAM_HOST}/frames/91a68e3297ca7bcba592fd62f189f64119c0f2eab914bc1526131e37c5a4c1e7.jpg`)
    });

    it('renders a bounding box as a div with a nested label span', () => {
        // replace the detection boxes data with ones we are sure about
        sampleEvents[0].detectionBoxes.numbers = [0.1, 0.2, 0.5, 0.9];
        sampleEvents[0].detectionBoxes.shape = [1,4];
        sampleEvents[0].floatMap['frame_height'] = 100;
        sampleEvents[0].floatMap['frame_width'] = 200;

        const eventImage = shallow(<EventImage event={sampleEvents[0]}/>);
        const box = eventImage.find('div > div[className="box"]');
        expect(box).not.toBeUndefined();
        box.should.be.length(1);
        // TODO test for style: position absolute, top, left, width, height presence
        const style = box.prop('style');
        expect(style).not.toBeUndefined();
        style.position.should.equal('absolute');
        style.top.should.equal(10);
        style.left.should.equal(40);
        style.width.should.equal(140);
        style.height.should.equal(40);
    });
})
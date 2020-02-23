import { render } from 'enzyme';
export function toMatchRenderedSnapshot(jsx) {
    try {
        expect(render(jsx)).toMatchSnapshot();
        return {
            message: function () { return 'expected JSX not to match snapshot'; },
            pass: true,
        };
    }
    catch (e) {
        return {
            message: function () { return "expected JSX to match snapshot: " + e.message; },
            pass: false,
        };
    }
}

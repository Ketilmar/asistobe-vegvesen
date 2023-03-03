import {expect, jest} from '@jest/globals'
import {filterTrafficPoints, filterByMunicipality, filterByCounty} from '../components/filterTrafficPoints';
import { exampleTrafficRegPoints } from './exampleJsonData';


describe('filterTrafficPoint.js', () => {
    const jsonObj = JSON.parse(exampleTrafficRegPoints);


    it('should sort data based on municipality', () => {
        let actual = filterByMunicipality('bergen', jsonObj);
        let expectedOutput = "Bergen";

        expect(actual[0].location.municipality.name).toBe(expectedOutput)
    })


    it('should sort data based on county', () => {
        let actual = filterByCounty('vestland', jsonObj);
        let expectedOutput = "Vestland";

        expect(actual[0].location.county.name).toBe(expectedOutput)
    })
})
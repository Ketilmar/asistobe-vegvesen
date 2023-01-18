# asistobe-vegvesen

lowerBound: Float
Lower bound, inclusive, of the vehicle lengths included in the range. Measured in meters.
Is null if there is no lower bound (i.e. unbounded).
upperBound: Float
The upper bound, exclusive, of the vehicle lengths included in the range. Measured in meters.
Is null if there is no upper bound (i.e. unbounded).
representation: String!
A text representation of the range. e.g. "[5.6, 7.6)". This means from 5.6 inclusive and up to 7.6 exclusive meters.

- [..,5.6) - less than 5.6 meters (light vehicles)
- [5.6,..) - more than 5.6 meters (heavy vehicles)
- [5.6,7.6) - between 5.6 and 7.6 meters
- [7.6,12.5) - between 7.6 and 12.5 meters
- [12.5,16.0) - between 12.5 and 16.0 meters
- [16.0,24.0) - between 16.0 and 24.0 meters
- [24.0,..) - more than 24.0 meters

### volumeNumbers
Traffic volume numbers. Will be null if either:
- Coverage is zero, since zero coverage means that this time period does not have any valid traffic events, or
- Traffic volume is unknown
### Coverage
Coverage is a measure for how much of a time period there is valid data for.
For traffic volume per hour or day, coverage is the ratio of time with valid data to the whole time period.
For average daily traffic volume, coverage is the average coverage for days with sufficient coverage (>95%),
multiplied by the ratio of number of days with sufficient coverage (>95%) to the total number of days in the period.

### byLengthRange
Traffic volume for each length range.
As length measurement is not guaranteed to be available for all registered traffic events, the sum of traffic
volumes for all length ranges may not add up to the total traffic volume. Note that bicycle registration points
do not register length at all, hence this field will always be an empty list for bicycle registration points.

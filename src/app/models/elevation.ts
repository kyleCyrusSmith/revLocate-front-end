export class Elevation {
    results: [
        {
            elevation: number;
            location: {
                lat: number;
                lng: number;
            },
            resolution: number;
        }
    ];
    status: string;
}

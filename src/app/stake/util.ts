import {RoochClient} from '@roochnetwork/rooch-sdk'

export type TokenInfo = {
	createBy: string,
	data: {
		alive: boolean,
		startTime: number,
		endTime: number,
		timeRemaining: number
	}
}

export async function getTokenInfo(client: RoochClient,
																		 address: string): Promise<TokenInfo> {
	const result = await client.getStates({
		accessPath: `/resource/${address}/${address}::grow_bitcoin::FarmingAsset`,
		stateOption: {
			decode: true,
			showDisplay: true,
		},
	})

	// return result
	const data = result[0];
	const decode = (((data.decoded_value as any).value as any).value as any).value as any;
	const startTime= decode['start_time'] as number;
	const endTime= decode['end_time'] as number;
	const now = Date.now() / 1000
	return {
		createBy: data.owner,
		data: {
			alive: decode['alive'] as boolean,
			startTime,
			endTime,
			timeRemaining: now > endTime ? 0 : Number((endTime - now).toFixed())
		}
	}
}
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchOwnedSwaps() {
    try {
        const response = yield axios.get('/api/swaps/ownedswaps');
        yield put({ type: 'SET_OWNED_SWAPS', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

function* fetchSwapItems(action) {
    try {
        const response = yield axios.get('/api/swaps/swapItems', action.payload.id);
        yield put({ type: 'SET_SWAP_ITEMS', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

export default function* swapSaga() {
    yield takeLatest('FETCH_OWNED_SWAPS', fetchOwnedSwaps);
    yield takeLatest('FETCH_SWAP_ITEMS', fetchSwapItems)
}
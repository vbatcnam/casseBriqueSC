function _(tgt, fun){
	return (tgt[fun]).bind(tgt);
}

export {_}
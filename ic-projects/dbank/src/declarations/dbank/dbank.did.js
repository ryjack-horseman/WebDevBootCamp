export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalence' : IDL.Func([], [IDL.Float64], ['query']),
    'compound' : IDL.Func([], [], ['oneway']),
    'topUp' : IDL.Func([IDL.Float64], [], ['oneway']),
    'withdrawAmount' : IDL.Func([IDL.Float64], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };

/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { API } from "../api";
import { useEffect, useState } from "react";

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  const showButton = () => {
    <button>{buttonText}</button>;
  };

  return <div>{showButton()}</div>;
}

export function objectShallowCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = { ...object };
  copy.a.c = 2;
  return { ...object };
}

export function arrayShallowCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = [...array];
  return copy;
}

export function UseEffectThrashing({ fetchURL, label }) {
  useEffect(() => {
    const fetchData = async () => {
      await fetch(fetchURL);
    };

    fetchData();
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  useEffect(() => {
    setReminder(clickedTimes % 5);
  }, [clickedTimes]);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>Sum: {sum}</span>
      <span>Remainder: {remainder}</span>
    </div>
  );
}

export function UseStateDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  const handleClick = () => {
    setClickedTimes(clickedTimes + 1);
    setReminder(clickedTimes % 5);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>Sum: {sum}</span>
      <span>Remainder: {remainder}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  const ref = useRef("Unmounted");

  useEffect(() => {
    ref.current = "Mounted";
  }, []);

  return <div>{ref.current}</div>;
}

export function UnrenderableState() {
  const [result, setResult] = useState();
  let loading = false;

  useEffect(() => {
    const fetchData = async () => {
      loading = true;
      const result = await API.unrenderableState();
      loading = false;
      setResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <span>Loading: {loading}</span>
      Result:{result}
    </div>
  );
}

export function CrudeDeclarations() {
  const calendarDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  return (
    <ol>
      {calendarDays.map((val) => (
        <span key={val}>{val}</span>
      ))}
    </ol>
  );
}

export function MagicNumbers({ age }) {
  return (
    <ol>{age > 18 ? <div>Spicy</div> : <div>You are not old enough</div>}</ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {};

  return (
    <div>
      <input value={name} name="name" type="text" onChange={setName} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export function CrudeStateManagement() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} name="name" type="text" onChange={setName} />
      <input value={age} name="age" type="number" onChange={setAge} />
      <input
        value={location}
        name="location"
        type="text"
        onChange={setLocation}
      />
      <input value={email} name="email" type="email" onChange={setEmail} />
      <input
        value={password}
        name="password"
        type="password"
        onChange={setPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <li>
      {bids.map((bid, i) => (
        <span key={i}>{bid}</span>
      ))}
      {asks.map((ask, j) => (
        <span key={j + "asks"}>{ask}</span>
      ))}
    </li>
  );
}

export function SubstandardDataStructure() {
  const [error, setError] = useState("");

  return (
    <div>
      <button onClick={() => setError("Error A")}>Throw Error A</button>
      <button onClick={() => setError("Error B")}>Throw Error B</button>
      <button onClick={() => setError("")}>Clear Errors</button>
      <div>{error}</div>
    </div>
  );
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = new FormData(e.target);
    setPeople((ppl) => [...ppl, ...person]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <span key={person.name}>{person.name}</span>
        ))}
      </ul>
    </div>
  );
}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await API.fetchLeader();
      setLeader(leader);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await API.fetchDetails(leader);
      setLeader(enriched);
    }
    enhanceRecord();
  }, [leader]);

  return (
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  );
}

// Hint: same error pattern as above
export function IncorrectDependencies({ records }) {
  const handleClick = useCallback(() => {
    API.trackRecordsClick(records);
  }, [records]);

  return (
    <div>
      {records.map((record) => (
        <div id={record.id}>{record.name}</div>
      ))}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export function UnnecessaryFunctionRedefinitions({ emails }) {
  const validateEmail = (email) => email.includes("@");

  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {validateEmail(email) ? "Valid" : "Invalid"}
        </div>
      ))}
    </div>
  );
}

export function SerialLoading() {
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const recs = await API.fetchRecords();
      const altRecs = await API.fetchAlternateRecords();
      setRecords(recs);
      setAltRecords(altRecs);
    }
    loadRecords();
  }, []);

  return (
    <div>
      {records.map((rec) => (
        <div key={rec.id}></div>
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}></div>
      ))}
    </div>
  );
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure({ altRecords }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await API.fetchRecords();
        setRecords(recs);
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
  }, []);

  return (
    <div>
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    </div>
  );
}

// RenderHooks

function useRenderHook(number) {
  return <div>{number}</div>;
}

export function RenderHookComponent() {
  const [counter, setCounter] = useState();
  const number = useRenderHook(counter);

  return (
    <div>
      <button onClick={() => setCounter((n) => n + 1)}>Click up</button>
      {number}
    </div>
  );
}

// Prop Drilling
export function ExcessivePropDrilling() {
  const counter = useState(0);
  const [count, setCount] = counter;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((o) => o + 1)}>Increment</button>

      <Multiplications counter={counter} />
      <Divisions counter={counter} />
    </div>
  );
}

function MultBy5({ setCount }) {
  return (
    <button onClick={() => setCount((old) => old * 5)}>Multiply by 5</button>
  );
}

function Multiplications({ counter }) {
  const [count, setCount] = counter;
  return (
    <div>
      <p>Multiply count: {count}</p>
      <MultBy5 setCount={setCount} />
    </div>
  );
}

function DivideBy5({ setCount }) {
  return (
    <button onClick={() => setCount((old) => old / 5)}>Divide by 5</button>
  );
}

function Divisions({ counter }) {
  const [count, setCount] = counter;
  return (
    <div>
      <p>Divide count: {count}</p>
      <DivideBy5 setCount={setCount} />
    </div>
  );
}

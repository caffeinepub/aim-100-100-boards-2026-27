import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  include MixinStorage();

  // Types
  // -------------------------------------------------------------

  type PomodoroSession = {
    startTime : Time.Time;
    endTime : ?Time.Time;
    duration : Nat;
    completed : Bool;
  };

  type SyllabusProgress = {
    subject : Text;
    chapter : Text;
    completed : Bool;
    page : Nat;
  };

  type StudyStreakRecord = {
    date : Time.Time;
    streakLength : Nat;
  };

  type User = {
    id : Principal;
    username : Text;
  };

  // Persistent Storage
  // -------------------------------------------------------------

  let users = Map.empty<Principal, User>();
  let syllabusProgress = Map.empty<Text, SyllabusProgress>();
  let pomodoroSessions = List.empty<PomodoroSession>();
  let studyStreaks = List.empty<StudyStreakRecord>();

  public shared ({ caller }) func registerUser(username : Text) : async () {
    if (users.containsKey(caller)) {
      Runtime.trap("User already exists. Username: " # username);
    };
    users.add(
      caller,
      { id = caller; username },
    );
  };

  public shared ({ caller }) func updateSyllabusProgress(subject : Text, chapter : Text, page : Nat, completed : Bool) : async () {
    let progress : SyllabusProgress = {
      subject;
      chapter;
      completed;
      page;
    };
    syllabusProgress.add(subject # "." # chapter, progress);
  };

  public shared ({ caller }) func startPomodoro() : async Nat {
    let session : PomodoroSession = {
      startTime = Time.now();
      endTime = null;
      duration = 25;
      completed = false;
    };
    pomodoroSessions.add(session);
    pomodoroSessions.size();
  };

  public shared ({ caller }) func completePomodoro(sessionId : Nat) : async Nat {
    if (sessionId >= pomodoroSessions.size()) {
      Runtime.trap("Pomodoro session not found");
    };
    let session = pomodoroSessions.at(sessionId);
    let completedSession : PomodoroSession = {
      startTime = session.startTime;
      endTime = ?Time.now();
      duration = session.duration;
      completed = true;
    };

    let oldSession = pomodoroSessions.at(sessionId);
    if (oldSession.completed) {
      Runtime.trap("Session already completed");
    };

    let iter = pomodoroSessions.enumerate();
    let updatedSessions = iter.map<(Nat, PomodoroSession), PomodoroSession>(
      func((currentIndex : Nat, s : PomodoroSession)) {
        if (currentIndex == sessionId) {
          completedSession;
        } else {
          s;
        };
      }
    );
    pomodoroSessions.clear();
    let arrayVersion = updatedSessions.toArray();
    pomodoroSessions.addAll(arrayVersion.values());
    sessionId;
  };

  public shared ({ caller }) func recordStudyStreak(streakLength : Nat) : async () {
    let record : StudyStreakRecord = {
      date = Time.now();
      streakLength;
    };
    studyStreaks.add(record);
  };

  // Query Methods
  // -------------------------------------------------------------

  public shared ({ caller }) func getUser() : async User {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found. Principal=" # caller.toText()) };
      case (?user) { user };
    };
  };

  public query ({ caller }) func getSyllabusProgress() : async [SyllabusProgress] {
    syllabusProgress.values().toArray();
  };

  public query ({ caller }) func getPomodoroSessions() : async [PomodoroSession] {
    pomodoroSessions.toArray();
  };

  public query ({ caller }) func getStudyStreaks() : async [StudyStreakRecord] {
    studyStreaks.toArray();
  };
};

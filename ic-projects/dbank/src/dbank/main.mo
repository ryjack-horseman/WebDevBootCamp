import Debug "mo:base/Debug";
import Time "mo:base/Time"; 
import Float "mo:base/Float";

actor DBank{
  stable var currentValue: Float = 300;
  currentValue := 300;
  Debug.print(debug_show(currentValue));

  let id = 2344546354645656;
  stable var startTime = Time.now();

  Debug.print(debug_show(id));
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawAmount(amount: Float){
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0){
      currentValue -= amount;
       Debug.print(debug_show(currentValue));
    }else{
        Debug.print("Amount too large, currentValue is negative");
    }
   
  };

  public query func checkBalence(): async Float {
    Debug.print(debug_show(currentValue));
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };
};

--------1---------
--trigger function to check if all fields are filled in registration
CREATE OR REPLACE FUNCTION check_registration_input()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_name IS NULL OR NEW.password IS NULL OR NEW.email IS NULL OR NEW.country IS NULL OR NEW.institution IS NULL THEN
        RAISE EXCEPTION 'All fields are required for registration';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--trigger to check if all fields are filled in registration
CREATE TRIGGER registration_input_check
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION check_registration_input();



--------2---------
--update max rating
CREATE OR REPLACE FUNCTION update_max_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.current_rating > OLD.max_rating THEN
        UPDATE users
        SET max_rating = NEW.current_rating
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_max_rating_trigger
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_max_rating();



--------3---------
--update rating trigger
CREATE OR REPLACE FUNCTION update_current_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_correct = 'yes' AND NEW.is_gym = 'no' THEN
        UPDATE users
        SET current_rating = current_rating + 5
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_current_rating_trigger
AFTER INSERT ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_current_rating();


--------4---------
--update contribution trigger
CREATE OR REPLACE FUNCTION update_user_contribution()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET contribution = contribution + 1
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_contribution_trigger
AFTER INSERT ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_user_contribution();


--------5---------
--update color trigger
CREATE OR REPLACE FUNCTION update_user_color()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.current_rating < 801 THEN
        NEW.color = 'grey';
    ELSIF NEW.current_rating BETWEEN 801 AND 1200 THEN
        NEW.color = 'green';
    ELSIF NEW.current_rating BETWEEN 1201 AND 1800 THEN
        NEW.color = 'blue';
    ELSIF NEW.current_rating BETWEEN 1801 AND 2200 THEN
        NEW.color = 'violet';
    ELSIF NEW.current_rating BETWEEN 2201 AND 2400 THEN
        NEW.color = 'range';
    ELSE
        NEW.color = 'red';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_color_trigger
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_user_color();


--------6---------
--update users problem_solved when a submission is made
CREATE OR REPLACE FUNCTION update_user_problem_solved()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET problems_solved = problems_solved + 1
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_problem_solved_trigger
AFTER INSERT ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_user_problem_solved();


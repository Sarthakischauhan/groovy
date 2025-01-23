CREATE OR REPLACE FUNCTION update_income()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Trigger Activated. TG_OP: %, NEW: %, OLD: %', TG_OP, NEW, OLD;

    IF (TG_OP = 'INSERT') THEN
        IF NEW.type = 'credit' THEN
            UPDATE users
            SET current_credit = current_credit + NEW.amount
            WHERE id = NEW.user_id;
        END IF;
        
    ELSIF (TG_OP = 'DELETE') THEN
        IF OLD.type = 'credit' THEN
            UPDATE users
            SET current_credit = current_credit - OLD.amount
            WHERE id = OLD.user_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;